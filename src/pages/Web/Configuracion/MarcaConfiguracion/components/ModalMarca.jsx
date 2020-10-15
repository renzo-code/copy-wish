import React from 'react'
import { connect } from 'react-redux'

import Modal from '../../../../../components/Modal/Modal'
import Input from '../../../../../components/Input/Input'
import ComboBox from '../../../../../components/ComboBox/ComboBox'

import { create as createMarca } from '../../../../../actions/marca/create'
import { list as obtenerCategoria } from '../../../../../actions/categoria/list'
import { list as obtenerEstado } from '../../../../../actions/estado/list'
import { edit as editarMarca, reset as resetPutMarca } from '../../../../../actions/marca/edit'

import './ModalMarca.scss'
import { isEmpty } from 'lodash'

class ModalMarca extends React.Component {
  state= {
    nuevaMarca: '',
    selectedCategoriaMarca: 0 ,
    selectedEstadoMarca : 0 ,

    errorMarca: false,
    errorCategoriaMarca: false,
    errorEstadoMarca : false
  }

  componentDidMount(){
    const { objEditarMarca, getEstado } = this.props
    if(!isEmpty(objEditarMarca)){
      getEstado()
    }
  }

  componentDidUpdate(prevProps, prevState){
    const { createMarca, getMarca, onClose, editMarca, objEditarMarca } = this.props

    if(prevProps.createMarca !== createMarca){
      getMarca(objEditarMarca.id_categoria)
      onClose()
    }
    if(prevProps.editMarca !== editMarca){
      // console.log('updated edit marca', editMarca)
      getMarca(objEditarMarca.id_categoria)
      onClose()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // const { objEditarMarca } = this.prop
    if(!isEmpty(nextProps.objEditarMarca) && nextProps.objEditarMarca !== prevState.objEditarMarca) {
      return {
        objEditarMarca : nextProps.objEditarMarca ,
        nuevaMarca : nextProps.objEditarMarca.marca ,
        selectedCategoriaMarca : nextProps.objEditarMarca.id_categoria ,
        selectedEstadoMarca : nextProps.objEditarMarca.id_estado
      }
    }
    return null
  }

  componentWillUnmount(){
    const { resetPutMarca } = this.props
    resetPutMarca()
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  validarMarca = () => {
    this.setState({
      errorMarca: false ,
      errorCategoriaMarca: false ,
      errorEstadoMarca : false ,
    })

    let esValido = true
    // const expresionesLetras = /^[a-z áéíóúñ]+$/i
    
    const {
      postMarca ,
      putMarca ,
      objEditarMarca
    } = this.props
    
    const { 
      nuevaMarca, 
      selectedCategoriaMarca, 
      selectedEstadoMarca 
    } = this.state
    
    // || !expresionesLetras.exec(nuevaMarca)
    if(nuevaMarca === '' ){
      esValido = false
      this.setState({
        errorMarca: true
      })
    }

    if(selectedCategoriaMarca === 0){
      esValido = false
      this.setState({
        errorCategoriaMarca: true
      })
    }

    if(!isEmpty(objEditarMarca)){
      if(selectedEstadoMarca === 0){
        esValido = false
        this.setState({
          errorEstadoMarca : true
        })
      }
    }

    if (!esValido) return

    const datosNuevaMarca = {
      'marca' : nuevaMarca ,
      'idCategoria' : selectedCategoriaMarca ,
    }

    if(isEmpty(objEditarMarca)){
      console.log('crear',datosNuevaMarca)
      postMarca(datosNuevaMarca)
    }

    if(!isEmpty(objEditarMarca)){
      datosNuevaMarca.idMarca = objEditarMarca.id_marca
      datosNuevaMarca.idEstado = selectedEstadoMarca
      // console.log('editar', datosNuevaMarca)
      putMarca(datosNuevaMarca)
    }
  }

  render(){
    console.log('editMarca',this.props.editMarca)
    // console.log('propsProps',this.props.objEditarMarca)
    // console.log('objEditarMarca', this.props.objEditarMarca)

    const { 
      objEditarMarca ,
      onClose, 
      show, 
      obtenerCategoria ,
      obtenerEstado
    } = this.props

    const { 
      nuevaMarca ,
      errorMarca ,
      errorCategoriaMarca ,
      selectedCategoriaMarca ,
      selectedEstadoMarca ,
      errorEstadoMarca ,
    } = this.state

    const optionsCategoria = obtenerCategoria.map((obj) => {
      return {
        id : obj.id_categoria ,
        description : obj.categoria
      }
    })

    const optionsEstado = obtenerEstado.map((obj) => { 
      return{
        id: obj.id_estado ,
        description : obj.estado
      }
    })

    return(
      <div>
        <Modal
          show={show}
          className="middle"
          onClose={onClose}
          nameButton={`${isEmpty(objEditarMarca) ? 'Crear' : 'Editar'}`}
          onClick={this.validarMarca}
        >
          <h1 className="title-crear-marca">{`${isEmpty(objEditarMarca) ? 'CREAR MARCA' : 'EDITAR MARCA'}`}</h1>
          <Input
            className="input-categoria"
            classNameTitle="title-input-marca"
            title="Marca :"
            placeholder="Nueva marca "
            name="nuevaMarca"
            onChange={this.inputChange}
            value={nuevaMarca}
            error={errorMarca}
            textError="Datos inválidos"
          />
          <ComboBox
            options={optionsCategoria}
            onChange={this.inputChange}
            title="Categoría :"
            placeholder="Seleccione categoría"
            name="selectedCategoriaMarca"
            value={selectedCategoriaMarca}
            error={errorCategoriaMarca}
            disabled={!isEmpty(objEditarMarca)}
          />
          {
            !isEmpty(objEditarMarca) &&
            (<ComboBox
              options={optionsEstado}
              className="input-categoria"
              onChange={this.inputChange}
              title="Estado :"
              name="selectedEstadoMarca"
              value={selectedEstadoMarca}
              error={errorEstadoMarca}
              disabled={isEmpty(objEditarMarca)}
            />)
          }
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  createMarca : store.marca.create.data,
  obtenerCategoria : store.categoria.list.data,
  obtenerEstado : store.estado.list.data,
  editMarca : store.marca.edit.data,
})

const mapDispatchToProps = (dispatch) => ({
  postMarca: (objMarca) => dispatch(createMarca(objMarca)),
  getCategoria: () => dispatch(obtenerCategoria()),
  getEstado: () => dispatch(obtenerEstado()),
  putMarca: (marcaEditada) => dispatch(editarMarca(marcaEditada)) ,
  resetPutMarca: () => dispatch(resetPutMarca())
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMarca)