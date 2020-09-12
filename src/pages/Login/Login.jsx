import React from 'react'
import './LoginStyle.scss'
import logo from '../../Images/logo.svg'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { list as listDepartamento } from '../../actions/departamento/list'
import { list as listTipoUsuario } from '../../actions/tipoUsuario/list'
import { list as listEstado } from '../../actions/estado/list'
import { list as listLogin } from '../../actions/login/list'

class Login extends React.Component {
  state = {
    email : '',
    password : '',
    errorEmail : false,
    errorPassword : false,

    datosTipo : {},
    dataEstado: {},
  }

  componentDidMount() {
    const { getDepartamento, getTipoUsuario, getEstado, postLogin } = this.props
    getDepartamento()
    getTipoUsuario()
    getEstado()
    postLogin()
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
    this.props.history.push(`/popular`)
  }



  render(){
    console.log('datatipo',this.state.datosTipo)
    console.log('props', this.props)
    // console.log('inputChange',this.state)
    return(
      <div className="master-login">
        <div className="img-productos">
          
        </div>
        <div className="formulario-wish">
          <div className="logo-formulario">
            <img src={logo} alt="logo-wish"/>
          </div>
          <div className="container-title">
            <h2>Entrar</h2>
            <h2>Regístrate</h2>
          </div>
          <Input
            onChange={this.inputChange}
            name="email"
            value={this.state.email}
            placeholder="Dirección de email"
            type="text"
            error={this.state.errorEmail}
            // alerta="Ingrese correctamente su email."
          />
          <Input
            onChange={this.inputChange}
            name="password"
            value={this.state.password}
            placeholder="Contraseña"
            type="password"
            // alerta="Ingrese correctamente su contraseña."
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
    )
  }
}

const mapStateToProps = (store) => ({
  listDepartamento: store.departamento.list.data,
  loadingListDepartamento: store.departamento.list.loading,
  listTipoUsuario: store.tipoUsuario.list.data,
  listEstado: store.estado.list.data,
  listLogin: store.login.list
})

const mapDispachToProps = (dispatch) => ({
  getDepartamento: () => dispatch(listDepartamento()),
  getTipoUsuario: () => dispatch(listTipoUsuario()),
  getEstado: () => dispatch(listEstado()),
  postLogin: () => dispatch(listLogin())
})

export default withRouter(connect(mapStateToProps, mapDispachToProps)(Login))