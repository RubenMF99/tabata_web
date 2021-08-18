import React,{useState, useEffect,useContext} from 'react';
import { Row, Col, Input, Button } from 'antd';
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import './Login.css'
import AuthContext from '../../context/autenticacion/authContext'
import Error from '../register/Error.js'
import logo from '../../assets/images/Logo.png'

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const {error, autenticado, login} = authContext;

    useEffect(() => {
      if(autenticado){
        props.history.push('/home')
      }
      // eslint-disable-next-line
    }, [autenticado]);

  const [user, setUser] = useState({
    email:'',
    password:'',
    
  })

  const [alert, setAlert] = useState('');

  const {email, password} = user

  const handleChange = e =>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

  const onSubmit = e =>{
    e.preventDefault();

     
    if( email.trim()==='' || password.trim()===''){
      setAlert('Todos los campos son obligatorios')
      return;
    }

    if(error){
      setAlert('Usuario no existe');
      return
    }
      login({email,password})

}
const responseGoogleSuccess = (response) => {
  const obj = response.profileObj;
  let toSend ={
    email:obj.email,
    password:response.tokenObj.login_hint
  }
  login(toSend);
}
const responseGoogleFailure = (response)=>{
  console.log(response.error);
}

  return (
    <div>
      <Row>
        <Col span={12} className='left login_col'> 
        <img src={logo} alt="gym" className='image'/>
        </Col>
        <Col span={12} >     
         <form className='login_col login_pre'>
         <p className='label'>Iniciar Sesion</p>
         <GoogleLogin
            clientId="92066997163-nk8aakcfc2tcapu5fr5d6ru90tqc4861.apps.googleusercontent.com"
            buttonText="Iniciar Sesion Con Google"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <br />
            <Input placeholder='Email' type='email' name='email' value={email} onChange={handleChange}></Input>
            <br /> 
            <Input placeholder='Password' type='password' name='password' value={password} onChange={handleChange}></Input>
            <br />
            {alert ? <Error message={alert} /> :null }
            <Button className='button' type='primary' onClick={onSubmit}>Login</Button>
              <br /> <br />
            <Link to={'/register'} className='link'>¿No tienes una cuenta? , Regístrate</Link>
            <Link to={'/recoverpassword'} className='link'>¿Olvidaste tu contraseña? , Recuperala</Link>
         </form>

        </Col>
      </Row>
    </div>
  );
};

export default Login;