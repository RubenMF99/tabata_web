import React from "react";
import styled from "@emotion/styled";
import fitness from "../../../assets/images/Pres_Ima.png";

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.3rem;
  margin: 1.5rem;
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 50px;
`;
const TextContainer = styled.div`
  font-size: 1.4rem;
`;
const TextTitle = styled.h5`
  font-size: 3rem;
  font-weight: 700;
  line-height: normal;
`;
const TextDesc = styled.p``;
const ImageContainer = styled.img`
  width: 40%;
`;

const Head = () => {
  return (
    <HeadContainer>
      <TextContainer>
        <TextTitle>Bienvenido a la comunidad fitness mas grande de latinoamerica</TextTitle>
        <TextDesc>
          Todo lo necesario a un toque.
        </TextDesc>
      </TextContainer>

      <ImageContainer src={fitness} />
    </HeadContainer>
  );
};

export default Head;
