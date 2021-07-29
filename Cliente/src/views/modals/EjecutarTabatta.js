import React, { useState } from "react";
import { Modal, Button } from "antd";
import styled from "@emotion/styled";

const Container = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ExerciseTitle = styled.div`
  display: flex;
  width: 100;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  text-align: center;
  font-size: 2.5rem;
`;

const ExerciseTimes = styled.div`
  text-align: center;
`;

const ExerciseTime = styled.h4`
  font-size: 1.7rem;
`;

const TabattaTime = styled.h2`
  line-height: 20px;
  font-size: 2rem;
`;

const EjecutarTabatta = ({
  visible,
  datosTabatta,
  listaEjercicios,
  tiempoEjercicios,
  setShowStartTabatta,
}) => {
  let intervalEjercicio = null,
    intervalTotal = null,
    pauseTabatta = false,
    vainas = listaEjercicios;

  const [btnText, setBtnText] = useState("Iniciar");
  const preparationTime = {
    name: "Preparación",
    seconds: datosTabatta.preparation,
  };
  const restTime = {
    name: "Descansando",
    seconds: datosTabatta.break,
  };

  const formatTime = (ms) => {
    let toTimeFormat = new Date(ms);
    return toTimeFormat.getMinutes() + ":" + toTimeFormat.getSeconds();
  };

  const calcularTiempoTotal = () => {
    return tiempoEjercicios * 1000;
  };

  let index = 0,
    e = null,
    tiempoTotal = 0;

  const handleInit = function () {
    if (!vainas.includes(preparationTime) || !vainas.includes(restTime)) {
      tiempoTotal = calcularTiempoTotal();
      vainas.unshift(preparationTime);
      vainas.push(restTime);
    }

    if (btnText === "Iniciar" || btnText === "Continuar") {
      setBtnText("Pausar");
      pauseTabatta = false;
    } else if (btnText === "Pausar") {
      setBtnText("Continuar");
      pauseTabatta = true;
    }

    if (!intervalEjercicio) {
      intervalEjercicio = setInterval(() => {
        if (index === vainas.length) {
          index = 0;
        }
        e = vainas[index];

        document.getElementById("nombre-ejercicio").innerHTML = e
          ? e.name
          : "null";
        document.getElementById("tiempo-ejercicio").innerHTML =
          "Tiempo Ejercicio: " + formatTime(e.seconds * 1000);

        if (!pauseTabatta) {
          e.seconds -= 1;
        }

        if (e.seconds <= 0) {
          index++;
        }
      }, 1000);
    }

    if (!intervalTotal) {
      intervalTotal = setInterval(() => {
        document.getElementById("tiempo-ronda").innerHTML =
          "Tiempo Ronda: " + formatTime(tiempoTotal);

        if (!pauseTabatta) {
          tiempoTotal -= 1000;
        }
        if (tiempoTotal <= 0) {
          clearInterval(intervalEjercicio);
          clearInterval(intervalTotal);
          setBtnText("Iniciar");
          document.getElementById("nombre-ejercicio").innerHTML = "null";
          document.getElementById("tiempo-ejercicio").innerHTML =
            "Tiempo Ejercicio: 0:00";
          document.getElementById("tiempo-ronda").innerHTML =
            "Tiempo Ejercicio: 0:00";
        }
      }, 1000);
    }
  };

  const handleStop = () => {
    setShowStartTabatta(false);
  };

  const handleClose = () => {
    handleStop();
  };

  return (
    <Modal
      onCancel={handleClose}
      title={datosTabatta.name}
      visible={visible}
      footer={[
        <Button onClick={handleInit}>{btnText}</Button>,
        <Button danger type="primary" onClick={handleStop}>
          Detener
        </Button>,
      ]}
    >
      <Container>
        <ExerciseTitle>
          <h1 id="nombre-ejercicio">Presione Iniciar</h1>
        </ExerciseTitle>
        <ExerciseTimes>
          <ExerciseTime id="tiempo-ejercicio">
            Tiempo Ejercicio: 0:00
          </ExerciseTime>
          <TabattaTime id="tiempo-ronda">Tiempo Ronda: 0:00</TabattaTime>
        </ExerciseTimes>
      </Container>
    </Modal>
  );
};

export default EjecutarTabatta;
