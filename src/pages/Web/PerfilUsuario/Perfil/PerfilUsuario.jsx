import React from 'react'
import { connect } from 'react-redux'

import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import ComboBox from '../../../../components/ComboBox/ComboBox'

import { list as obtenerUsuario } from '../../../../actions/usuario/list'
import { list as obtenerDepartamento } from '../../../../actions/departamento/list'
import { list as obtenerProvincia } from '../../../../actions/provincia/list'
import { list as obtenerDistrito } from '../../../../actions/distrito/list'
import { edit as editarUsuario } from '../../../../actions/usuario/edit'

import './PerfilUsuarioStyle.scss'

const localObjName = JSON.parse(localStorage.getItem("jwt")) || { reply : {} }

class PerfilUsuario extends React.Component {
  state={
    inputNombre : localObjName.reply.nombres,
    inputApellidos: localObjName.reply.apellidos,
    inputTelefono: localObjName.reply.telefono,
    inputEmail: localObjName.reply.email,
    inputFechaNacimiento: localObjName.reply.fecha_nacimiento,
    inputDireccion: localObjName.reply.direccion,
    inputDNI: localObjName.reply.dni,
    comboBoxDepartamento: localObjName.reply.id_departamento,
    comboBoxProvincia: localObjName.reply.id_provincia,
    comboBoxDistrito: localObjName.reply.id_distrito,
    estadoBtnEditar : true
  }

  componentDidMount(){
    const { comboBoxDepartamento, comboBoxProvincia } = this.state
    const { getUsuario, getDepartamento, getProvincia, getDistrito } = this.props
    getUsuario(localObjName.reply.id_usuario)
    getDepartamento()
    getProvincia(comboBoxDepartamento)
    getDistrito(comboBoxProvincia)
  }
  
  
  editarInformacionUsuario = () => {
    const { 
      inputNombre,
      inputApellidos,
      inputTelefono,
      inputEmail,
      inputDireccion
    } = this.state

    const {
      putUsuario,
      
    } = this.props

    const datosUsuarioEditado = {
      'nombres' : inputNombre,
      'apellidos' : inputApellidos,
      'telefono' : inputTelefono,
      'email' : inputEmail,
      'direccion' : inputDireccion,
      'idUsuario' : localObjName.reply.id_usuario
    }
    
    putUsuario(datosUsuarioEditado)
  }

  componentDidUpdate(prevProps, prevState){
    const {
      inputNombre,
      inputApellidos,
      inputTelefono,
      inputEmail,
      inputDireccion
    } = this.state

    const {
      editUsuario
    } = this.props

    if(prevState.inputNombre !== inputNombre ||
      prevState.inputApellidos !== inputApellidos ||
      prevState.inputTelefono !== inputTelefono ||
      prevState.inputEmail !== inputEmail ||
      prevState.inputDireccion !== inputDireccion){
        this.setState({
          estadoBtnEditar : false
        })
      }
    if(prevProps.editUsuario !== editUsuario){
      
      const newLs = {
        ...localObjName,
        reply: {
          ...localObjName.reply,
          
          "nombres" : inputNombre,
          "apellidos" : inputApellidos,
          "telefono" : inputTelefono,
          "email" : inputEmail,
          "direccion" : inputDireccion,
        }
      }
      localStorage.setItem('jwt', JSON.stringify(newLs))
    }
  }

    inputChange = (e) => {
      this.setState({
      [e.target.name] : e.target.value
    })
  }

  render(){
    // console.log('localObjName',localObjName)
    // console.log('propUsuario',this.props)
    const { 
      inputNombre,
      inputApellidos,
      inputTelefono,
      inputEmail,
      inputFechaNacimiento,
      inputDireccion,
      inputDNI,
      comboBoxDepartamento,
      comboBoxProvincia,
      comboBoxDistrito,
      estadoBtnEditar
    } = this.state

    const {
      listDepartamento,
      listProvincia,
      listDistrito
    } = this.props

    const optionsDepartamento = listDepartamento.map((item) => {
      return{
        id : item.id_departamento,
        description : item.departamento
      }
    })

    const optionsProvincia = listProvincia.map((item) => {
      return{
        id: item.id_provincia,
        description : item.provincia
      }
    })

    const optionsDistrito = listDistrito.map((item) => {
      return{
        id: item.id_distrito,
        description: item.distrito
      }
    })

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
              value={inputNombre}
              placeholder="Nombres"
            />
            <Input
              className="title-input-perfil"
              onChange={this.inputChange}
              name="inputApellidos"
              value={inputApellidos}
              placeholder="Apellidos"
            />
            <Input
              className="title-input-perfil"
              name="DNI"
              value={inputDNI}
              disabled={true}
            />
            <Input
              className="title-input-perfil"
              onChange={this.inputChange}
              name="inputTelefono"
              value={inputTelefono}
              placeholder="Telefono"
            />
            <Input
              className="title-input-perfil"
              onChange={this.inputChange}
              name="inputEmail"
              value={inputEmail}
              placeholder="Email"
            />
            <Input
              className="title-input-perfil"
              onChange={this.inputChange}
              name="inputFechaNacimiento"
              value={(inputFechaNacimiento).substring(0,10)}
              placeholder="Fecha de nacimiento"
              disabled={true}
            />
            <ComboBox
              className="combo-perfil-usuario"
              onChange={this.inputChange}
              value={comboBoxDepartamento}
              options={optionsDepartamento}
              disabled={true}
            />
            <ComboBox
              className="combo-perfil-usuario"
              value={comboBoxProvincia}
              options={optionsProvincia}
              disabled={true}
            />
            <ComboBox
              className="combo-perfil-usuario"
              value={comboBoxDistrito}
              options={optionsDistrito}
              disabled={true}
            />
            <Input
              className="title-input-perfil"
              onChange={this.inputChange}
              name="inputDireccion"
              value={inputDireccion}
              placeholder="Direccion"
            />
            <Button
              name="Guardar cambios"
              onClick={this.editarInformacionUsuario}
              disabled={estadoBtnEditar}
            />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (store) => ({
  listUsuario: store.usuario.list.data,
  listDepartamento: store.departamento.list.data,
  listProvincia: store.provincia.list.data,
  listDistrito: store.distrito.list.data,
  editUsuario: store.usuario.edit.data
})
const mapDispatchToProps = (dispatch) => ({
  getUsuario: () => dispatch(obtenerUsuario()),
  getDepartamento: () => dispatch(obtenerDepartamento()),
  getProvincia: (id) => dispatch(obtenerProvincia(id)),
  getDistrito: (id) => dispatch(obtenerDistrito(id)),
  putUsuario: (obj) => dispatch(editarUsuario(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuario)