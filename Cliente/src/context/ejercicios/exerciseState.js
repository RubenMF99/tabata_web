import React, { useReducer } from "react";
import ExerciseContext from "./exerciseContext";
import { ExerciseReducer } from "./exerciseReducer";
import clienteAxios from "../../config/axios";

import { AGREGAR_EJERCICIO, OBTENER_EJERCICIOS_TABATTA } from "../../types";

const ExerciseState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    exerciseList: null,
  };

  const [state, dispatch] = useReducer(ExerciseReducer, initialState);

  const obtenerEjerciciosTabatta = async (tabattaId) => {
    try {
      const res = await clienteAxios.get(`/api/exercise/${tabattaId}`);
      dispatch({
        type: OBTENER_EJERCICIOS_TABATTA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createExercise = async (datos) => {
    try {
      const res = await clienteAxios.post("/api/exercise", datos);
      dispatch({
        type: AGREGAR_EJERCICIO,
        payload: res.data.exercise,
      });
      obtenerEjerciciosTabatta(res.data.exercise.routine);
    } catch (error) {
      console.log(error);
    }
  };

  const editarEjercicio = async (exerciseId, datos) => {
    try {
      const res = await clienteAxios.put(`/api/exercise/${exerciseId}`, datos);
      obtenerEjerciciosTabatta(res.data.exercise.routine);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExerciseContext.Provider
      value={{
        exerciseList: state.exerciseList,
        obtenerEjerciciosTabatta,
        createExercise,
        editarEjercicio,
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseState;
