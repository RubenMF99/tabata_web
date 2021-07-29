import React, { useState, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import EjercicioItem from "./EjercicioItem";
import NuevoEjercicioModal from "../../modals/NuevoEjercicioModal";
import EditarTabattaModal from "../../modals/EditarTabattaModal";
import EjecutarTabatta from "../../modals/EjecutarTabatta";

import TabattaContext from "../../../context/tabatta/tabattaContext";
import ExerciseContext from "../../../context/ejercicios/exerciseContext";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 75%;
  background: #fafafa;
`;
const TitleDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 1.6rem;
  color: #65737e;
`;
const TabattaInfo = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: white;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
`;
const TabattaExercises = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  padding: 1rem 0;
  align-items: center;
`;
const TabattaInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const InfoLabel = styled.span`
  margin-right: 3px;
  color: #65737e;
`;
const EjerciciosContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const EjercicioList = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showNewExercise, setShowNewExercise] = useState(false);
  const [showEditTabatta, setShowEditTabatta] = useState(false);
  const [showStartTabatta, setShowStartTabatta] = useState(false);

  const [updateList, setUpdateList] = useState(false);

  const tabattaContext = useContext(TabattaContext);
  const { selectedTabatta, eliminarTabatta } = tabattaContext;

  const exerciseContext = useContext(ExerciseContext);
  const { obtenerEjerciciosTabatta, exerciseList } = exerciseContext;

  const handleNewExercise = () => {
    setShowNewExercise(true);
  };

  useEffect(() => {
    if (selectedTabatta) {
      obtenerEjerciciosTabatta(selectedTabatta._id);
      setShowInfo(true);
    }
    // eslint-disable-next-line
  }, [selectedTabatta, updateList]);

  const handleDeleteTabatta = () => {
    setShowInfo(false);

    setTimeout(() => {
      eliminarTabatta(selectedTabatta._id);
    }, 500);
  };

  const handleEditTabatta = () => {
    setShowEditTabatta(true);
  };

  const handleStartTabatta = () => {
    setShowStartTabatta(true);
  };

  return showInfo ? (
    <Container>
      <TitleDiv>
        <Title> {selectedTabatta.name} </Title>
      </TitleDiv>
      <TabattaInfo>
        <TabattaInfoContent>
          <InfoLabel>
            {exerciseList ? (
              <span>
                <strong>Duración Total:</strong> {exerciseList.totalDuration}{" "}
                segundos
              </span>
            ) : null}
          </InfoLabel>
        </TabattaInfoContent>
        <TabattaInfoContent>
          <Button
            className="action-button"
            size="small"
            type="default"
            onClick={handleStartTabatta}
          >
            Iniciar Tabatta
          </Button>
          <Button
            className="action-button"
            size="small"
            type="primary"
            onClick={handleEditTabatta}
          >
            Editar Tabatta
          </Button>
          <Button
            className="action-button"
            size="small"
            type="danger"
            onClick={handleDeleteTabatta}
          >
            Eliminar Tabatta
          </Button>
        </TabattaInfoContent>
      </TabattaInfo>

      <TabattaExercises>
        <Title>Lista de Ejercicios</Title>
        <EjerciciosContainer>
          {exerciseList
            ? exerciseList.exercises.map((e) => (
                <EjercicioItem datos={e} key={e._id} />
              ))
            : null}
        </EjerciciosContainer>
        <Button
          className="button-ae"
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={handleNewExercise}
        >
          Agregar Ejercicio
        </Button>

        {exerciseList ? (
          <EjecutarTabatta
            visible={showStartTabatta}
            datosTabatta={selectedTabatta}
            listaEjercicios={exerciseList.exercises}
            tiempoEjercicios={exerciseList.totalDuration}
            setShowStartTabatta={setShowStartTabatta}
          />
        ) : null}

        <NuevoEjercicioModal
          visible={showNewExercise}
          setShowNewExercise={setShowNewExercise}
          setUpdateList={setUpdateList}
        />
        <EditarTabattaModal
          visible={showEditTabatta}
          setShowEditTabatta={setShowEditTabatta}
        />
      </TabattaExercises>
    </Container>
  ) : (
    <Container>
      <Title> Selecciona un Tabatta </Title>
    </Container>
  );
};

export default EjercicioList;
