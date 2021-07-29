import React from "react";
import styled from "@emotion/styled";
import exampleData from "../../../utils/data.json";
import InfoCard from "./InfoCard";

const InfoContainer = styled.div`
  padding: 1.3rem;
  margin: 1rem;
`;
const InfoTitle = styled.h5`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: normal;
`;
const InfoCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Info = () => {
  return (
    <InfoContainer>
      <InfoTitle>Servicios Disponible</InfoTitle>
      <InfoCardContainer>
        {exampleData.homeInfo.map((e) => (
          <InfoCard datos={e} key={e.id}/>
        ))}
      </InfoCardContainer>
    </InfoContainer>
  );
};

export default Info;
