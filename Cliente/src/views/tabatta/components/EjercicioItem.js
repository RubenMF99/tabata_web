import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons"; //CloseOutlined,
import EditarEjercicioModal from "../../modals/EditarEjercicioModal";

const EjercicioCard = styled.div`
  color: #65737e;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin: 5px;
  border-radius: 20px;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const EjercicioName = styled.h4`
  font-weight: 500;
`;

const EjercicioTime = styled.h4`
  font-weight: 400;
`;

const EjerciciosNameDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  text-align: left;
  align-items: center;
`;

const EjerciciosTimeDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: center;
  align-items: center;
`;

const EjerciciosButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  justify-content: flex-end;
`;
const EjercicioItem = ({ datos }) => {
  const [showEditExercise, setShowEditExercise] = useState(false);

  const handleEditExercise = () => {
    setShowEditExercise(true);
  };

  return (
    <EjercicioCard>
      <EjerciciosNameDiv>
        <EjercicioName>{datos.name}</EjercicioName>
      </EjerciciosNameDiv>
      <EjerciciosTimeDiv>
        {" "}
        <EjercicioTime>{datos.seconds} segundos</EjercicioTime>{" "}
      </EjerciciosTimeDiv>

      <EjerciciosButtonsDiv>
        <Button
          style={{ marginRight: "5px" }}
          type="primary"
          shape="circle"
          icon={<EditOutlined />}
          onClick={handleEditExercise}
        />
        {/* <Button style={{marginRight: "5px"}} type="danger" shape="circle" icon={<CloseOutlined />} /> */}
        <EditarEjercicioModal
          visible={showEditExercise}
          setShowEditExercise={setShowEditExercise}
          ejercicio={datos}
        />
      </EjerciciosButtonsDiv>
    </EjercicioCard>
  );
};

export default EjercicioItem;
