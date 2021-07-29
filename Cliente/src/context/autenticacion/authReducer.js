import {
  OBTENER_USUARIO,
  CERRAR_SESION,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  REGISTRO_ERROR,
  REGISTRO_EXITOSO,
} from "../../types";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("autenticado", "true");
      return {
        ...state,
        usuario: action.payload.user,
        autenticado: true,
        mensaje: null,
        error: null,
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
      };

    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      return {
        ...state,
        error: true,
      };
    case CERRAR_SESION:
      localStorage.removeItem("token");
      localStorage.removeItem("autenticado");
      return {
        ...state,
        autenticado: null,
      };

    default:
      return state;
  }
};
