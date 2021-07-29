import React, { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import TabattaList from "./TabattaList";
import NuevoTabattaModal from "../../modals/NuevoTabattaModal";

import AuthContext from "../../../context/autenticacion/authContext";
import TabattaContext from "../../../context/tabatta/tabattaContext";

import { Input, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
const { Search } = Input;

const SidebarContainer = styled.section`
  width: 25%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem;
  background-color: #f5f5f5;
`;
const SearchLabel = styled.label`
  font-size: 0.8rem;
  line-height: normal;
  margin-bottom: 5px;
`;
const SidebarListTabatta = styled.div`
  margin-top: 4rem;
`;
const SidebarHead = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
`;
const Welcome = styled.span`
  font-size: 1.2rem;
  margin-bottom: 0;
  line-height: 16px;
`;
const Name = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0;
`;

const Sidebar = () => {
  const [datosListar, setDatosListar] = useState(null);
  const [showNewTabatta, setShowNewTabatta] = useState(false);

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const tabattaContext = useContext(TabattaContext);
  const { tabattaList, obtenerTabattas } = tabattaContext;

  const onSearch = (value) => {
    let filtro;
    if (value.length === 0) {
      filtro = tabattaList;
    } else {
      filtro = tabattaList.filter((r) =>
        r.name.toLowerCase().includes(value.toLowerCase())
      );
    }

    setDatosListar(filtro);
  };
  const handleOnClick = () => {
    setShowNewTabatta(true);
  };

  useEffect(() => {
    if (!datosListar) {
      obtenerTabattas();
      if (tabattaList) {
        setDatosListar(tabattaList);
      }
    } else if (tabattaList) {
      setDatosListar(tabattaList);
    }
    onSearch("");

    // eslint-disable-next-line
  }, [tabattaList]);

  return (
    <SidebarContainer>
      <SidebarHead>
        <Welcome>Bienvenido, </Welcome>
        <Name>{usuario.name}</Name>
      </SidebarHead>
      <Button
        type="primary"
        block
        onClick={() => handleOnClick()}
        icon={<PlusCircleOutlined />}
        className="button-ae"
      >
        Crear un Tabatta
      </Button>
      <NuevoTabattaModal
        visible={showNewTabatta}
        setShowNewTabatta={setShowNewTabatta}
      />

      <SidebarListTabatta>
        <SearchLabel htmlFor="search-input">Buscar un Tabatta</SearchLabel>
        <Search
          id="search-input"
          placeholder="Nombre Tabatta"
          onSearch={onSearch}
        />
        {datosListar ? <TabattaList listaTabatta={datosListar} /> : null}
      </SidebarListTabatta>
    </SidebarContainer>
  );
};

export default Sidebar;
