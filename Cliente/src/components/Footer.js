import React from "react";
import styled from "@emotion/styled";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #65737e;
  font-weight: 700;
`;
const Footer = () => {
  return (
    <FooterContainer>
      <span>Ruben Mrtinez & Carla viggiano &#169; 2021</span>
    </FooterContainer>
  );
};

export default Footer;
