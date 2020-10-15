import React from 'react'
import './LoginStyle.scss'
import logo from '../../Images/logo.svg'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import ModalRegistro from './components/ModalRegistro'

import { auth } from '../../actions/login/auth'

class Login extends React.Component {
  state = {
    email : '',
    password : '',
    errorEmail : false,
    errorPassword : false,

    datosTipo : {},
    dataEstado: {},

    estadoModal: false,
  }

  componentDidUpdate(prevProps) {
    const { auth, history } = this.props
    if(prevProps.auth !== auth) {
      history.push(`/popular`)
    }
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  iniciarSesion = () => {
    this.setState({
      errorEmail : false,
      errorPassword : false
    })

    const { email, password } = this.state
    const { postLogin } = this.props

    let esValido = true

    if(email === ''){
      esValido = false
      this.setState({
        errorEmail : true
      })
    }
    if(password === ''){
      esValido = false
      this.setState({
        errorPassword : true
      })
    }

    const datosLogin = {
      'email' : email,
      'password' : password
    }

    if(!esValido) return
    postLogin(datosLogin)
    
  }

  abrirModal = () => {
    this.setState({
      estadoModal : true
    })
  }

  cerrarModal = () => {
    this.setState({
      estadoModal : false
    })
  }

  render(){
    console.log('props', this.props)

    const { 
      email,
      errorEmail,
      password,
      errorPassword,
      estadoModal,
    } = this.state

    return(
      <>
        <div className="master-login">
          <div className="img-productos">
            
          </div>
          <div className="formulario-wish">
            <div className="logo-formulario">
              <img src={logo} alt="logo-wish"/>
            </div>
            <div className="container-title">
              <h2>Entrar</h2>
              <h2 
                onClick={this.abrirModal}
              >
                Regístrate
              </h2>
            </div>
            <Input
              onChange={this.inputChange}
              name="email"
              value={email}
              placeholder="Dirección de email"
              type="text"
              error={errorEmail}
              textError="Email no puede ser vacío"
            />
            <Input
              onChange={this.inputChange}
              name="password"
              value={password}
              placeholder="Contraseña"
              type="password"
              error={errorPassword}
              textError="Contraseña incorrecta"
              />
            <div className="container-pregunta">
              <h4 className="pregunta">¿Olvidaste tu contraseña?</h4>
            </div>
            <Button
              name="Entrar"
              onClick={this.iniciarSesion}
              />
            <div className="container-parrafo">
              <p className="parrafo">
                Al elegir 'Iniciar sesión', 'Facebook' o 'Google', 
                estás de acuerdo con las Wish Condiciones de uso y la Política de privacidad. 
                Este sitio está protegido por reCAPTCHA. La Política de privacidad y las 
                Condiciones del servicio de Google son aplicables.
              </p>
            </div>
          </div>
        </div>
        {
          estadoModal && <ModalRegistro
          onClose={this.cerrarModal}
          show={estadoModal}
          />
        }
      </>
      )
    }
  }
// [LIST-CREATE-EDIT-SHOW-REMOVE]
const mapStateToProps = (store) => ({
  auth: store.login.auth.data
})
//[GET, POST, PUT, DELETE]
const mapDispachToProps = (dispatch) => ({
  postLogin: (obj) => dispatch(auth(obj))
})

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Login))