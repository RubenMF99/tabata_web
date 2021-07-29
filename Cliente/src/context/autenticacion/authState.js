import React, { useReducer } from "react";
import AuthContext from "./authContext";
import { AuthReducer } from "./authReducer";
import tokenAuth from "../../config/tokenAuth";
import clienteAxios from "../../config/axios";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
} from "../../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async (dates) => {
    try {
      const res = await clienteAxios.post("/api/user", dates);
      console.log(res.data);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: res.data,
      });

      usuarioAutenticado();
    } catch (error) {
      console.log(error);

      dispatch({
        type: REGISTRO_ERROR,
        payload: error,
      });
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("/api/auth");

      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (dates) => {
    try {
      const res = await clienteAxios.post("/api/auth", dates);
      console.log(res);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: res.data,
      });

      usuarioAutenticado();
    } catch (error) {
      console.log(error);

      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    }
  };

  const cerrarSesion = async () => {
    
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        autenticado: state.autenticado,
        error: state.error,
        usuario: state.usuario,
        registerUser,
        login,
        cerrarSesion,
        usuarioAutenticado
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
