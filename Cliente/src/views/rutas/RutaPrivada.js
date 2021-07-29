import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
};

export default RutaPrivada;