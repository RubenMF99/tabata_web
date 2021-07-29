import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "../login/Login.css";
import gym2 from "../../assets/images/Logo.png";
import AuthContext from "../../context/autenticacion/authContext";
import Error from "./Error";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { autenticado, registerUser } = authContext;

  useEffect(() => {
    if (autenticado) {
      props.history.push("/home");
    }

    // eslint-disable-next-line
  }, [autenticado]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    sexo: "M",
  });

  const [alerta, setAlerta] = useState("");

  const { name, email, password, confirm, sexo } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      setAlerta("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 8) {
      setAlerta("la contraseña debe contar con por lo menos 8 caracteres");
      return;
    }

    if (password !== confirm) {
      setAlerta("las contraseñas no coinciden");
      return;
    }

    registerUser({
      name,
      email,
      sexo,
      password,
    });
  };
  return (
    <div>
      <Row>
        <Col span={12}>
          <form className="login_col login_pre">
            <p className="label">Registrarse</p>
            <Input
              placeholder="nombre"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            ></Input>
            <br />
            <Input
              placeholder="Correo"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            ></Input>
            <br />
            <Input
              placeholder="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            ></Input>
            <br />
            <Input
              placeholder="Repetir contraseña"
              type="password"
              name="confirm"
              value={confirm}
              onChange={handleChange}
            ></Input>
            <br />
            {alerta ? <Error message={alerta} /> : null}
            <Button className="button2" type="primary" onClick={onSubmit}>
              Registrar
            </Button>
            <br /><br />
            <Link to={"/"} className="link">
            ¿Ya tienes una cuenta? , accede
            </Link>
          </form>
        </Col>

        <Col span={12} className="left login_col">
          <img src={gym2} alt="gym2" className="image" />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
