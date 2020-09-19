import React from 'react'
import './perfilUsuarioStyle.scss'
import Input from '../../../components/Input/Input'
import jwt_decode from "jwt-decode"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'


class perfilUsuario extends React.Component {
  state={

  }

  render(){

    const localObjName = JSON.parse(localStorage.getItem("jwt"))
    console.log('localObjName', localObjName)

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
              {localObjName.nombres}{localObjName.apellidos}
            </div>
          </div>

          <div className="cabeza-editar-perfil">
            <h2>Perfil Público</h2>
            <p>Añade información sobre tí</p>
          </div>
        </div>

          <div className="cuerpo-editar-perfil">
            <Input
              title="Información básica"
            />
          </div>
      </div>
    )
  }
}



export default perfilUsuario