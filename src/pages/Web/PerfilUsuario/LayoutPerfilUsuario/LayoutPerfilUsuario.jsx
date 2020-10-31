import React from 'react'
import jwt_decode from "jwt-decode"
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './LayoutPerfilUsuario.scss'

class PerfilUsuario extends React.Component {
  state={
    inputNombre : '',
    inputApellidos: '',
    inputTelefono: '',
    inputEmail: '',
    inputFechaNacimiento: '',
    inputDireccion: '',

  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.targe.value
    })
  }

  render(){
    
    const { children } = this.props

    const localObjName = localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : {}

    const decode = jwt_decode(localObjName.token)

    return(
      <div className="usuario-master">
        <div className="contenedor-perfil-usuario">
          <div className="sidebar-editar-perfil">
            <div className="cont-cont-icon">
              <div className="sidebar-editar-icon">
                <FontAwesomeIcon icon={faUser}/>
              </div>
            </div>
            <div className="nombres-editar-perfil">
              <h2>{decode.nombres} {decode.apellidos}</h2>
            </div>
              <div className="cont-perfil-foto">
                <Link 
                  className="perfil-link"
                  to="/perfil-usuario/datos"
                >
                  Mi perfil
                </Link>
              </div>
              <div className="cont-perfil-foto">
                <Link 
                  className="perfil-link"
                  to="/perfil-usuario/foto"
                >
                  Foto de Perfil
                </Link>
              </div>
              <div className="cont-perfil-foto">
                <Link
                  className="perfil-link"
                  to="/perfil-usuario/desactivar" 
                >
                  Desactivar cuenta
                </Link>
              </div>
          </div>
          <div className="cont-cuerpo-editar-perfil">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default PerfilUsuario