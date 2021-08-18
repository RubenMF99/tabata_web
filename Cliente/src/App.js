import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //Redirect,

import "./index.css";

import ExerciseState from "./context/ejercicios/exerciseState";
import AuthState from "./context/autenticacion/authState";
import TabattaState from "./context/tabatta/tabattaState";

import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
import Tabatta from "./views/tabatta/Tabatta";
import RutaPrivada from "./views/rutas/RutaPrivada"
import recoverpassword from "./views/recover/recoverpassword";

const App = () => {
  return (
    <AuthState>
      <TabattaState>
        <ExerciseState>
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/recoverpassword" component={recoverpassword}/>
            <RutaPrivada exact path="/tabatta" component={Tabatta} />
          </Switch>
        </Router>
        </ExerciseState>
      </TabattaState>
    </AuthState>
  );
};

export default App;
