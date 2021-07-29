import React, { useState, useContext } from "react";
import { Modal, Input } from "antd";
import styled from "@emotion/styled";

import TabattaContext from "../../context/tabatta/tabattaContext";

const SearchLabel = styled.label`
  font-size: 0.8rem;
  line-height: normal;
`;

const NuevoTabattaModal = ({ visible, setShowEditTabatta }) => {
  const tabattaContext = useContext(TabattaContext);
  const { selectedTabatta, editarTabatta } = tabattaContext;

  const [tabattaData, setTabattaData] = useState({
    name: selectedTabatta.name,
  });

  const { name } = tabattaData;

  const handleOk = () => {
    setShowEditTabatta(false);
    editarTabatta(selectedTabatta._id, { name });
  };
  const handleCancel = () => {
    setShowEditTabatta(false);
  };

  const handleOnChange = (e) => {
    setTabattaData({ ...tabattaData, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      title="Editar Tabatta"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Cancelar"
    >
      <SearchLabel htmlFor="edit-tabatta">Nuevo nombre del Tabatta</SearchLabel>
      <Input
        placeholder="ex: Pecho"
        id="edit-tabatta"
        name="name"
        value={name}
        onChange={handleOnChange}
      />
    </Modal>
  );
};

export default NuevoTabattaModal;
