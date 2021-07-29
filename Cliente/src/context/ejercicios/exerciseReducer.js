import {
  AGREGAR_EJERCICIO,
  OBTENER_EJERCICIOS_TABATTA,
} from "../../types";

export const ExerciseReducer = (state, action) => {
  switch(action.type) {
    case AGREGAR_EJERCICIO: 
      return {
        ...state,
      }
    case OBTENER_EJERCICIOS_TABATTA:
      return {
        ...state,
        exerciseList: action.payload
      }
    default:
      return state;
  }
}