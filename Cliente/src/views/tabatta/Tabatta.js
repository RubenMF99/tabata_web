import React from "react";
import styled from "@emotion/styled";
import LayoutApp from "../../components/LayoutApp";
import Sidebar from "./components/Sidebar";
import EjercicioList from "./components/EjercicioList";

const TabattaView = styled.section`
  display: flex;
  flex-direction: row;
`;

const Tabatta = () => {
  return (
    <LayoutApp>
      <TabattaView>
        <Sidebar />
        <EjercicioList />
      </TabattaView>
    </LayoutApp>
  );
};

export default Tabatta;
