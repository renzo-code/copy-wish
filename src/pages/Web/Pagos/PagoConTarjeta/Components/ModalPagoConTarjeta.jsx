import React from 'react'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import Input from '../../../../../components/Input/Input'
import Modal from '../../../../../components/Modal/Modal'

import { reset as resetTarjeta, create as crearTarjeta } from '../../../../../actions/pagoTarjeta/create'
import { list as obtenerTarjeta } from '../../../../../actions/pagoTarjeta/list'
import { edit as editarTarjeta, reset as resetEditarTarjeta } from '../../../../../actions/pagoTarjeta/edit'

import './ModalPagoConTarjeta.scss'
import Button from '../../../../../components/Button/Button'

class ModalPagoConTarjeta extends React.Component {
  state = {
    codigoTarjeta : '',
    fechaVencimientoTarjeta : '',
    codigoCVC : '',

    errorCodigoTarjeta : false,
    errorFechaVencimientoTarjeta : false,
    errorCodigoCVC : false,

    mostrarCVC : "password"
  }

  componentDidMount(){
    const { getTarjeta } = this.props
    getTarjeta()
  }

  componentDidUpdate(prevProps, prevState){
    const { createTarjeta, getTarjeta, onClose, editTarjeta } = this.props

    if(prevProps.createTarjeta !== createTarjeta){
      getTarjeta()
      onClose()
    }
    if(prevProps.editTarjeta !== editTarjeta){
      getTarjeta()
      onClose()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!isEmpty(nextProps.objEditarTarjeta) && nextProps.objEditarTarjeta !== prevState.objEditarTarjeta){
      return {
        objEditarTarjeta : nextProps.objEditarTarjeta,
        codigoTarjeta : nextProps.objEditarTarjeta.codigo_tarjeta,
        fechaVencimientoTarjeta : nextProps.objEditarTarjeta.fecha_vencimiento,
        codigoCVC : nextProps.objEditarTarjeta.cvc
      }
    }
    return null
  }
  
  componentWillUnmount(){
    console.log('componentWillUnmount')
    const { resetCreateTarjeta, resetPutTarjeta } = this.props
    resetCreateTarjeta()
    resetPutTarjeta()
    this.limpiarFormulario()
  }

  limpiarFormulario = () => {
    console.log('limpiarFormulario')
      this.setState({
        codigoTarjeta : '',
        fechaVencimientoTarjeta : '',
        codigoCVC : ''
      })
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  validarTarjeta = () => {
    this.setState({
      errorCodigoTarjeta : false,
      errorFechaVencimientoTarjeta : false,
      errorCodigoCVC : false
    })

    let esValido = true
    
    const expresionesNumeros = /^[0-9]+$/i

    const {
      codigoTarjeta,
      fechaVencimientoTarjeta,
      codigoCVC
    } = this.state

    const {
      postTarjeta,
      objEditarTarjeta,
      putTarjeta
    } = this.props

    if(codigoTarjeta === '' || !expresionesNumeros.exec(codigoTarjeta)){
      esValido = false
      this.setState({
        errorCodigoTarjeta : true
      })
    }

    if(fechaVencimientoTarjeta === '' ){
      esValido = false
      this.setState({
        errorFechaVencimientoTarjeta : true
      })
    }

    if(codigoCVC === '' || !expresionesNumeros.exec(codigoCVC)){
      esValido = false
      this.setState({
        errorCodigoCVC : true
      })
    }

    if(!esValido) return

    const datosNuevaTarjeta = {
      'codigo' : codigoTarjeta,
      'fechaVencimiento' : fechaVencimientoTarjeta,
      'cvc' : codigoCVC
    }

    if(isEmpty(objEditarTarjeta)){
      postTarjeta(datosNuevaTarjeta)
    }

    if(!isEmpty(objEditarTarjeta)){
      datosNuevaTarjeta.idTarjeta = objEditarTarjeta.id_tarjeta_usuario
      putTarjeta(datosNuevaTarjeta)
    }
  }

  verCVC = () => {
    const { mostrarCVC } = this.state
    this.setState({
      mostrarCVC : mostrarCVC === 'password'  ? "text" : "password"
    })
  }

  render(){
    // console.log('asd',this.props.objEditarTarjeta)

    const { show , onClose, objEditarTarjeta } = this.props

    const { 
      codigoTarjeta,
      fechaVencimientoTarjeta,
      codigoCVC, 
      errorCodigoTarjeta,
      errorFechaVencimientoTarjeta,
      errorCodigoCVC,
      mostrarCVC
    } = this.state

    return(
      <div>
        <Modal
          show={show}
          onClose={onClose}
          className="big"
          nameButton={`${isEmpty(objEditarTarjeta) ? 'Crear' : 'Editar'}`}
          onClick={this.validarTarjeta}
        >
          <div className="container-modal-tarjeta">
            <Input
              placeholder="Código de la tarjeta"
              className="input-nro-tarjeta"
              name="codigoTarjeta"
              value={codigoTarjeta}
              onChange={this.inputChange}
              error={errorCodigoTarjeta}
              textError="Datos inválidos"
            />
            <Input
              placeholder="F. Vencimiento"
              className="fecha-vencimiento-tarjeta"
              name="fechaVencimientoTarjeta"
              value={fechaVencimientoTarjeta}
              onChange={this.inputChange}
              error={errorFechaVencimientoTarjeta}
              textError="Datos inválidos"
            />
            <Input
              placeholder="CVC"
              type={`${isEmpty(objEditarTarjeta) ? this.ocultarCVC : mostrarCVC}`}
              className="cvc-tarjeta"
              name="codigoCVC"
              value={codigoCVC}
              onChange={this.inputChange}
              error={errorCodigoCVC}
              textError="Datos inválidos"
            />
            {
              !isEmpty(objEditarTarjeta) &&
              <Button
                name="ver"
                className="btn-mostrar-cvc"
                onClick={this.verCVC}
              />
            }
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  createTarjeta : store.pagoTarjeta.create.data,
  listTarjeta : store.pagoTarjeta.list.data,
  editTarjeta : store.pagoTarjeta.edit.data
})
const mapDispatchToProps = (dispatch) => ({
  getTarjeta : () => dispatch(obtenerTarjeta()),
  postTarjeta : (nuevaTarjeta) => dispatch(crearTarjeta(nuevaTarjeta)),
  resetCreateTarjeta : () => dispatch(resetTarjeta()),
  putTarjeta : (tarjetaEdit) => dispatch(editarTarjeta(tarjetaEdit)),
  resetPutTarjeta : () => dispatch(resetEditarTarjeta())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalPagoConTarjeta)