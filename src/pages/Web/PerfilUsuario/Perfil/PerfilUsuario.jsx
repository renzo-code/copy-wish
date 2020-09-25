import React from 'react'
import './PerfilUsuarioStyle.scss'
import Input from '../../../../components/Input/Input'
// import jwt_decode from "jwt-decode"
// import { Link } from 'react-router-dom'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import {  } from '@fortawesome/free-brands-svg-icons'

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
    return(
      <>
        <div className="cabeza-editar-perfil">
          <h2>Perfil Público</h2>
          <p>Añade información sobre tí</p>
        </div>

        <div className="cuerpo-editar-perfil">
          <div className="input-form-editar-perfil">
            <Input
              title="Informacion Básica"
              className="title-input-perfil"
              onChange={this.inputChange}
              name="inputNombre"
              value=""
              placeholder="Nombres"
            />
            <Input
              onChange={this.inputChange}
              name="inputApellidos"
              value=""
              placeholder="Apellidos"
            />
            <Input
              onChange={this.inputChange}
              name="inputTelefono"
              value=""
              placeholder="Telefono"
            />
            <Input
              onChange={this.inputChange}
              name="inputEmail"
              value=""
              placeholder="Email"
            />
            <Input
              onChange={this.inputChange}
              name="inputFechaNacimiento"
              value=""
              placeholder="Fecha de nacimiento"
            />
            <Input
              onchange={this.inputChange}
              name="inputDireccion"
              value=""
              placeholder="Direccion"
            />
          </div>
        </div>
      </>
    )
  }
}

export default PerfilUsuario