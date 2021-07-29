import React, { useState, useContext } from "react";
import { Modal, Input, Slider } from "antd";
import styled from "@emotion/styled";

import TabattaContext from "../../context/tabatta/tabattaContext";

const SearchLabel = styled.label`
  font-size: 0.8rem;
  line-height: normal;
`;

const NuevoTabattaModal = ({ visible, setShowNewTabatta }) => {
  const [tabattaData, setTabattaData] = useState({
    name: "",
    rest: 0,
    preparation: 0
  });

  const { name, preparation, rest } = tabattaData;

  const tabattaContext = useContext(TabattaContext);
  const { crearTabatta, obtenerTabattas } = tabattaContext;

  const handleOk = () => {
    setShowNewTabatta(false);
    crearTabatta({ name, preparation, break: rest });
    obtenerTabattas();
    setTabattaData({
      name: "",
      preparation: 0,
      rest: 0
    });
  };
  const handleCancel = () => {
    setShowNewTabatta(false);
    setTabattaData({
      name: "",
      preparation: 0,
      rest: 0
    });
  };

  const handleOnChange = (e) => {
    setTabattaData({ ...tabattaData, [e.target.name]: e.target.value })
  }
  return (
    <Modal
      title="Crear Nuevo Tabatta"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Cancelar"
    >
      <SearchLabel htmlFor="new-tabatta">Nombre del Tabatta</SearchLabel>
      <Input
        placeholder="ex: Pecho"
        id="new-tabatta"
        name="name"
        value={name}
        onChange={handleOnChange}
      />
      <SearchLabel>
        Tiempo de Preparación (En Segundos)
      </SearchLabel>
      <Slider
        defaultValue={0}
        max={60}
        value={tabattaData.preparation}
        onChange={(value) => {
          setTabattaData({ ...tabattaData, preparation: value });
        }}
      />
      <SearchLabel>
        Tiempo de Descanso (En Segundos)
      </SearchLabel>
      <Slider
        defaultValue={0}
        max={60}
        value={tabattaData.rest}
        onChange={(value) => {
          setTabattaData({ ...tabattaData, rest: value });
        }}
      />
    </Modal>
  );
};

export default NuevoTabattaModal;
