import React from 'react'
import { isEmpty } from 'lodash'
import Modal from '../../../components/Modal/Modal'
import './ModalRegistroStyle.scss'

import Input from '../../../components/Input/Input'
import ComboBox from '../../../components/ComboBox/ComboBox'

import { connect } from 'react-redux'

import { auth } from'../../../actions/login/auth'
import { reset as resetDepartamento , list as listDepartamento} from '../../../actions/departamento/list'
import { reset as resetProvincia ,list as listProvincia } from '../../../actions/provincia/list'
import { reset as resetDistrito,list as listDistrito } from '../../../actions/distrito/list'
import { create as createUsuario } from '../../../actions/usuario/create'


class ModalRegistro extends React.Component {
  state = {
    listDepartamento : [],
    listProvincia: [],
    listDistrito: [],

    datosNombre: '',
    datosApellido: '',
    datosTelefono: '',
    datosEmail: '',
    datosPassword: '',
    fechaNacimiento: '',
    datosDireccion: '',
    datosDNI: '',
    departamentoSeleccionado: 0,
    provinciaSeleccionada: 0,
    distritoSeleccionado: 0,

    errorNombre: false,
    errorApellido: false,
    errorTelefono: false,
    errorEmail: false,
    errorPassword: false,
    errorFechaNacimiento: false,
    errorDireccion: false,
    errorDNI: false,
    errorDepartamento: false,
    errorProvincias: false,
    errorDistrito: false,

    newUsuario: {}
  }

  componentDidMount(){
    const { getDepartamento } = this.props
    console.log('Montado')
    getDepartamento()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEmpty(nextProps.listDepartamento) && nextProps.listDepartamento !== prevState.listDepartamento) {
      return {
        listDepartamento: nextProps.listDepartamento
      }
    }
    if (!isEmpty(nextProps.listProvincia) && nextProps.listProvincia !== prevState.listProvincia) {
      return{
        listProvincia: nextProps.listProvincia
      }
    }
    if (!isEmpty(nextProps.listDistrito) && nextProps.listDistrito !== prevState.listDistrito) {
      return{
        listDistrito: nextProps.listDistrito
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    const { departamentoSeleccionado } = this.state
    if (prevState.departamentoSeleccionado !== departamentoSeleccionado) {
      this.cleanComboBox()
    }
  }

  cleanComboBox = () => {
    this.setState({
      distritoSeleccionado: 0,
      provinciaSeleccionada: 0,
    })
  }

  componentWillUnmount() {
    console.log('Desmontado')
    const { resetDepartamento, resetProvincia, resetDistrito } = this.props
    resetDepartamento()
    resetProvincia()
    resetDistrito()
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  validarUsuario = () => {
    this.setState({
      errorNombre : false,
      errorApellido: false,
      errorTelefono: false,
      errorEmail: false,
      errorPassword: false,
      errorFechaNacimiento: false,
      errorDireccion: false,
      errorDNI: false,
      errorDepartamento: false,
      errorProvincias: false,
      errorDistrito: false
    })

    let esValido = true

    const expresionLetras = /^[a-z áéíóúñ]+$/i
    const expresionesNumeros = /^[0-9]+$/i
    const { 
      datosNombre, 
      datosApellido, 
      datosTelefono,
      datosEmail,
      datosPassword,
      fechaNacimiento,
      datosDireccion,
      datosDNI,
      departamentoSeleccionado,
      provinciaSeleccionada,
      distritoSeleccionado
    } = this.state

    if(datosNombre === '' || !expresionLetras.exec(datosNombre)){
      esValido = false
      this.setState({
        errorNombre : true
      })
    }
    
    if(datosApellido === '' || !expresionLetras.exec(datosApellido)){
      esValido = false
      this.setState({
        errorApellido : true
      })
    }

    if(datosTelefono === '' || !expresionesNumeros.exec(datosTelefono)){
      esValido = false
      this.setState({
        errorTelefono : true
      })
    }

    if(datosEmail === ''){
      esValido = false 
      this.setState({
        errorEmail : true
      })
    }

    if(datosPassword === '') {
      esValido = false
      this.setState({
        errorPassword : true
      })
    }

    if(fechaNacimiento === '') {
      esValido = false
      this.setState({
        errorFechaNacimiento: true
      })
    }

    if(datosDireccion === ''){
      esValido = false
      this.setState({
        errorDireccion : true
      })
    }

    if(datosDNI === '' || !expresionesNumeros.exec(datosDNI)){
      esValido = false
      this.setState({
        errorDNI : true
      })
    }

    if(departamentoSeleccionado === 0){
      esValido = false
      this.setState({
        errorDepartamento: true
      })
    }

    if(provinciaSeleccionada === 0){
      esValido= false
      this.setState({
        errorProvincias: true
      })
    }

    if(distritoSeleccionado === 0){
      esValido= false
      this.setState({
        errorDistrito: true
      })
    }
    
    const datosRegistro = {
      'nombres' : datosNombre,
      'apellidos' : datosApellido,
      'telefono' : datosTelefono,
      'email' : datosEmail,
      'password' : datosPassword,
      'fechaNacimiento' : fechaNacimiento,
      'direccion' : datosDireccion,
      'dni' : datosDNI,
      'idDepartamento' : departamentoSeleccionado,
      'idProvincia' : provinciaSeleccionada,
      'idDistrito' : distritoSeleccionado
    }

    if(!esValido) return
    this.props.createUsuario(datosRegistro)
    this.props.onClose()
  }

  render(){
    console.log('listProvincia', this.props)
    // console.log('datosNombre', this.state.datosNombre)

    const { getProvincia, getDistrito } = this.props
    const { listDepartamento, listProvincia, listDistrito } = this.state

    const optionsDepartamento = listDepartamento.map((obj) => {
      return{
        id : obj.id_departamento,
        description: obj.departamento
      }
    })

    const optionsProvincia = listProvincia.map((obj) => {
      return{
        id: obj.id_provincia,
        description : obj.provincia
      }
    })

    const optionsDistrito = listDistrito.map((obj) => {
      return {
        id: obj.id_distrito,
        description: obj.distrito
      }
    })

    return(
      <div>
        <Modal
          show={this.props.show}
          className="middle"
          onClose={this.props.onClose}
          nameButton="Registrar"
          onClick={this.validarUsuario}
        >
          <h2 className="registrar-usuario">REGISTRAR USUARIO</h2>
          <Input
            title="Escriba sus nombres :"
            placeholder="Nombres"
            onChange={this.inputChange}
            name="datosNombre"
            value={this.state.datosNombre}
            error={this.state.errorNombre}
          />
          <Input
            title="Escriba sus apellidos :"
            placeholder="Apellidos"
            onChange={this.inputChange}
            name="datosApellido"
            value={this.state.datosApellido}
            error={this.state.errorApellido}
          />
          <Input
            title="Numero de contacto :"
            placeholder="Telefono"
            onChange={this.inputChange}
            name="datosTelefono"
            value={this.state.datosTelefono}
            error={this.state.errorTelefono}
          />
          <Input
            title="Correo Electrónico :"
            placeholder="ejemplo@hotmail.com"
            onChange={this.inputChange}
            name="datosEmail"
            value={this.state.datosEmail}
            error={this.state.errorEmail}
          />
          <Input
            title="Cree su contraseña :"
            type="password"
            placeholder="Ingrese su nueva clave"
            onChange={this.inputChange}
            name="datosPassword"
            value={this.state.datosPassword}
            error={this.state.errorPassword}
          />
          <Input
            title="Fecha de nacimiento :"
            type="date"
            min="1940-01-01"
            max="2021-01-01"
            onChange={this.inputChange}
            name="fechaNacimiento"
            value={this.state.fechaNacimiento}
            error={this.state.errorFechaNacimiento}
          />
          <Input
            title="DNI"
            placeholder="Nª de documento"
            onChange={this.inputChange}
            name="datosDNI"
            value={this.state.datosDNI}
            error={this.state.errorDNI}
          />
          <ComboBox
            onChange={(e) => {
              this.inputChange(e)
              getProvincia(e.target.value)
              console.log('e.target.value',e.target.value)
            }}
            options={optionsDepartamento}
            value={this.state.departamentoSeleccionado}
            name="departamentoSeleccionado"
            title="Departamento - Perú"
            placeholder="Seleccione su Departamento"
            error={this.state.errorDepartamento}
          />
          <ComboBox
            onChange={(e) => {
              this.inputChange(e)
              getDistrito(e.target.value)
              console.log('e.target.value',e.target.value)
            }}
            options={optionsProvincia}
            value={this.state.provinciaSeleccionada}
            name="provinciaSeleccionada"
            title="Provincias"
            placeholder="Seleccione su Provincia"
            error={this.state.errorProvincias}
          />
          <ComboBox
            onChange={this.inputChange}
            options={optionsDistrito}
            value={this.state.distritoSeleccionado}
            name="distritoSeleccionado"
            title="Distritos"
            placeholder="Seleccione su distrito"
            error={this.state.errorDistrito}
          />
          <Input
            title="Domicilio :"
            placeholder="Direccion"
            onChange={this.inputChange}
            name="datosDireccion"
            value={this.state.datosDireccion}
            error={this.state.errorDireccion}
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  auth: store,
  listDepartamento: store.departamento.list.data,
  listProvincia: store.provincia.list.data,
  listDistrito: store.distrito.list.data,
  postUsuario: store.usuario.create
})

const mapDispatchToProps = (dispatch) => ({
  postLogin:() => dispatch(auth()),
  resetDepartamento: () => dispatch(resetDepartamento()),
  getDepartamento: () => dispatch(listDepartamento()),
  getProvincia: (id) => dispatch(listProvincia(id)),
  resetProvincia: () => dispatch(resetProvincia()),
  getDistrito: (id) => dispatch(listDistrito(id)),
  resetDistrito: () => dispatch(resetDistrito()),
  createUsuario: (obj) => dispatch(createUsuario(obj))
})

const Main = connect(mapStateToProps, mapDispatchToProps)

export default Main(ModalRegistro)