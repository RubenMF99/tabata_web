import React, { useContext } from "react";
import styled from "@emotion/styled";
import { ImportOutlined, ExportOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.ico";
import AuthContext from "../context/autenticacion/authContext";
import TabattaContext from "../context/tabatta/tabattaContext";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HomeButton = styled(Link)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
`;

const Logo = styled.img`
  width: 70px;
  margin: 0 5px;
  border-radius:10px;
`;

const ButtonText = styled.span`
  font-size: 1.2rem;
  padding: 0 10px;
  color: black;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NavOption = styled(Link)`
  color: #65737e;
  margin: 0 1rem;
  text-decoration: none;
  /* text-transform: uppercase; */
  font-weight: 500;
`;

const NavCSOption = styled(Link)`
  color: #65737e;
  margin: 0 1rem;
  text-decoration: none;
`;

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { cerrarSesion, autenticado } = authContext;

  const tabattaContext = useContext(TabattaContext);
  const { eliminarTabattaSeleccionado } = tabattaContext;

  const handleCerrarSesion = () => {
    cerrarSesion();
    eliminarTabattaSeleccionado();
  };

  return (
    <NavbarContainer>
      <NavigationButtons>
        <HomeButton to={"/home"}>
          <Logo src={logo} alt="Logo Tabatta" />
          <ButtonText>Tabata</ButtonText>
        </HomeButton>
        {autenticado ? (
          <NavOption to={"/tabatta"}>Lista de Tabattas</NavOption>
        ) : null}
      </NavigationButtons>

      {autenticado ? (
        <NavCSOption to={"/"} onClick={handleCerrarSesion}>
          <ImportOutlined /> Cerrar Sesión
        </NavCSOption>
      ) : (
        <NavCSOption to={"/"}>
          <ExportOutlined /> Iniciar Sesión
        </NavCSOption>
      )}
    </NavbarContainer>
  );
};

export default Navbar;