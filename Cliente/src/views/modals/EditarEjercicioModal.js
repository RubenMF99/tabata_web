import React, { useContext, useState } from "react";
import { Modal, Input, Slider } from "antd";
import styled from "@emotion/styled";

import ExerciseContext from "../../context/ejercicios/exerciseContext";

const Label = styled.label`
  font-size: 0.8rem;
  line-height: normal;
`;

const EditarEjercicioModal = ({ visible, setShowEditExercise, ejercicio }) => {
  const exerciseContext = useContext(ExerciseContext);
  const { editarEjercicio } = exerciseContext;

  const [ejercicioData, setEjercicioData] = useState(ejercicio);

  const { name, seconds, _id } = ejercicioData;

  const handleOk = () => {
    editarEjercicio(_id, ejercicioData)
    setShowEditExercise(false);
  };
  const handleCancel = () => {
    setShowEditExercise(false);
  };
  return (
    <Modal
      title="Editar Ejercicio"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Cancelar"
    >
      <Label htmlFor="edit-exercise">Nombre del Ejercicio</Label>
      <Input
        placeholder="ex: Pecho"
        id="edit-exercise"
        name="name"
        value={name}
        onChange={(e) => setEjercicioData({...ejercicioData, [e.target.name]: e.target.value})}
      />
      <Label>
        Duración del Ejercicio (En Segundos)
      </Label>
      <Slider
        defaultValue={0}
        max={60}
        value={seconds}
        onChange={(value) => setEjercicioData({...ejercicioData, seconds: value})}
      />
    </Modal>
  );
};

export default EditarEjercicioModal;
