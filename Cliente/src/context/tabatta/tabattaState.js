import React, { useReducer } from "react";
import TabattaContext from "./tabattaContext";
import { TabattaReducer } from "./tabattaReducer";
import clienteAxios from "../../config/axios";

import {
  CREAR_TABATTA,
  CREAR_TABATTA_ERROR,
  OBTENER_TABATTAS,
  OBTENER_TABATTAS_ERROR,
  OBTENER_TABATTA_XID,
  OBTENER_TABATTA_XID_ERROR,
  ELIMINAR_TABATTA,
  ELIMINAR_TABATTA_SELECCIONADO,
  EDITAR_TABATTA
} from "../../types";

const TabattaState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    tabattaList: null,
    selectedTabatta: null,
  };

  const [state, dispatch] = useReducer(TabattaReducer, initialState);

  const obtenerTabattas = async () => {
    try {
      const res = await clienteAxios.get("/api/routine");

      dispatch({
        type: OBTENER_TABATTAS,
        payload: res.data.routine,
      });
    } catch (error) {
      dispatch({
        type: OBTENER_TABATTAS_ERROR,
      });
    }
  };

  const obtenerTabattaID = async (id) => {
    try {
      const res = await clienteAxios.get("api/routine");
      dispatch({
        type: OBTENER_TABATTA_XID,
        payload: {
          lista: res.data.routine,
          searchId: id,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: OBTENER_TABATTA_XID_ERROR,
      });
    }
  };

  const crearTabatta = async (datos) => {
    try {
      const res = await clienteAxios.post("/api/routine", datos);
      dispatch({
        type: CREAR_TABATTA,
        payload: res.data
      });
      obtenerTabattas();
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREAR_TABATTA_ERROR,
      });
    }
  };

  const eliminarTabatta = async (routineId) => {
    try {
      await clienteAxios.delete(`/api/routine/${routineId}`);
      dispatch({
        type: ELIMINAR_TABATTA,
      });
      obtenerTabattas();
    } catch (error) {
      console.log(error);
    }
  };

  const editarTabatta = async (routineId, datos) => {
    try {
      const res = await clienteAxios.put(`/api/routine/${routineId}`, datos);
      dispatch({
        type: EDITAR_TABATTA,
        payload: res.data.routine
      })
      obtenerTabattas();
    } catch (error) {
      console.log(error);
    }
  }

  const eliminarTabattaSeleccionado = () => {
    dispatch({
      type: ELIMINAR_TABATTA_SELECCIONADO
    })
  }

  return (
    <TabattaContext.Provider
      value={{
        tabattaList: state.tabattaList,
        selectedTabatta: state.selectedTabatta,
        obtenerTabattas,
        crearTabatta,
        obtenerTabattaID,
        eliminarTabatta,
        editarTabatta,
        eliminarTabattaSeleccionado
      }}
    >
      {props.children}
    </TabattaContext.Provider>
  );
};

export default TabattaState;
