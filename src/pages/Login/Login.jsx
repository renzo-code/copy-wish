import React from 'react'
import './LoginStyle.scss'
import logo from '../../Images/logo.svg'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import ModalRegistro from './components/ModalRegistro'

import { list as listDepartamento } from '../../actions/departamento/list'
import { list as listTipoUsuario } from '../../actions/tipoUsuario/list'
import { list as listEstado } from '../../actions/estado/list'
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

  componentDidMount() {
    const { getDepartamento, getTipoUsuario, getEstado } = this.props
    getDepartamento()
    getTipoUsuario()
    getEstado()
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
    
    let esValido = true
    
    if(this.state.email === ''){
      esValido = false
      this.setState({
        errorEmail : 'E-mail incorrecto.'
      })
    }
    if(this.state.password === ''){
      esValido = false
      this.setState({
        errorPassword : 'Contraseña incorrecta.'
      })
    }
    if(!esValido) return
    // postLogin()
    this.props.history.push(`/popular`)
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
    console.log('datatipo',this.state.datosTipo)
    console.log('props', this.props)

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
              value={this.state.email}
              placeholder="Dirección de email"
              type="text"
              error={this.state.errorEmail}
            />
            <Input
              onChange={this.inputChange}
              name="password"
              value={this.state.password}
              placeholder="Contraseña"
              type="password"
              error={this.state.errorPassword}
              />
            <div className="container-pregunta">
              <h4 className="pregunta">¿Olvidaste tu contraseña?</h4>
            </div>
            <Button
              nameButton="Entrar"
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
        <ModalRegistro 
          onClick={this.abrirModal}
          onClose={this.cerrarModal}
          show={this.state.estadoModal}
        />
      </>
      )
    }
  }

const mapStateToProps = (store) => ({
  listDepartamento: store.departamento.list.data,
  loadingListDepartamento: store.departamento.list.loading,
  listTipoUsuario: store.tipoUsuario.list.data,
  listEstado: store.estado.list.data,
  auth: store
})

const mapDispachToProps = (dispatch) => ({
  getDepartamento: () => dispatch(listDepartamento()),
  getTipoUsuario: () => dispatch(listTipoUsuario()),
  getEstado: () => dispatch(listEstado()),
  postLogin: () => dispatch(auth())
})

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Login))
