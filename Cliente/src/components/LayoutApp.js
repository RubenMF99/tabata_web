import React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import Navbar from "./Navbar";
import FooterB from "./Footer";

const { Header, Footer, Content } = Layout;

const MainContainer = styled(Content)`
  min-height: 100vh;
  background: #b0d1ff;
  padding: 0 0;
`;
const HeaderContainer = styled(Header)`
  background: #f5f5f5;
`;
const FooterContainer = styled(Footer)`
  background: #f5f5f5;
`;

const LayoutApp = ({ children }) => {
  return (
    <Layout>
      <HeaderContainer>
        <Navbar />
      </HeaderContainer>
      <MainContainer>{children}</MainContainer>
      <FooterContainer>
        <FooterB />
      </FooterContainer>
    </Layout>
  );
};

export default LayoutApp;
