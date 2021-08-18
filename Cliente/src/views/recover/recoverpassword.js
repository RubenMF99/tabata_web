import React,{useState, useEffect,useContext} from 'react';
import { Row, Col, Input, Button } from 'antd';
import '../login/Login.css'
import AuthContext from '../../context/autenticacion/authContext'
import {Link} from 'react-router-dom'

const recoverpassword =()=>{
   
    return(
        <div>
            <Row>
            <Col span={12} className='left login_col'> 
            <form>
                 <p className='label'>Recuperar Contraseña</p>
                 <Input placeholder='Email' type='email' name='email' ></Input>
                 <br/>
                 <Button className='button' type='primary' >Login</Button>
            </form>
            </Col>   
            <Col span={12} className='left recover'> 
            <form>
                 <p className='label' >Ingrese Codigo </p>
                 <Input placeholder='Codigo' type='Number' name='Codigo' ></Input>
                 <br/>
                 <Button className='button' type='primary' >Verificar</Button>
                 <br/><br/>
                 <p className='label'>Nueva Contraseña</p>
                 <Input placeholder='Email' type='email' name='email' ></Input>
                 <br/><br/>
            <Input
              placeholder="Contraseña"
              type="password"
              name="password"
            ></Input>
            <br /><br/>
            <Input
              placeholder="Repetir contraseña"
              type="password"
              name="confirm"
            ></Input>
            <br/>
                 <Button className='button' type='primary' >Cambiar</Button>
            </form>
            </Col>      
            </Row>
        </div>
        

    );

}

export default recoverpassword;