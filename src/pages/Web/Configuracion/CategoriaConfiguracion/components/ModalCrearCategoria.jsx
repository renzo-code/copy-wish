import React from 'react'

import Modal from '../../../../../components/Modal/Modal'
import Input from '../../../../../components/Input/Input'
import ComboBox from '../../../../../components/ComboBox/ComboBox'

import { create as createCategoria } from '../../../../../actions/categoria/create'
import { list as obtenerEstado } from '../../../../../actions/estado/list'
import { edit as editarCategoria } from '../../../../../actions/categoria/edit'

import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import './ModalCrearCategoria.scss'

class ModalCrearCategoria extends React.Component {
  state= {
    datosNuevaCategoria : '',

    errorCategoria: false ,
    errorEstadoCategoria: false ,

    selectedEstadoCategoria: 0
  }

  componentDidMount(){
    const { objEditarCategoria, getEstado } = this.props

    if(!isEmpty(objEditarCategoria)){
      getEstado()
    }
  }

  componentDidUpdate(prevProps, prevState){
    const { createCategoria, getCategoria, onClose } = this.props

    if(prevProps.createCategoria !== createCategoria) {
      getCategoria()
      onClose()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!isEmpty(nextProps.objEditarCategoria) && nextProps.objEditarCategoria !== prevState.objEditarCategoria){
      return {
        objEditarCategoria : nextProps.objEditarCategoria ,
        datosNuevaCategoria : nextProps.objEditarCategoria.categoria ,
        selectedEstadoCategoria : nextProps.objEditarCategoria.id_estado
      }
    }
    return null
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  validarCategoria = () => {
    this.setState({
      errorCategoria: false ,
      errorEstadoCategoria : false
    })

    let esValido = true

    const expresionesLetras = /^[a-z áéíóúñ]+$/i

    const { objEditarCategoria } = this.props

    const {
      datosNuevaCategoria ,
      selectedEstadoCategoria
      } = this.state

    if(datosNuevaCategoria === '' || !expresionesLetras.exec(datosNuevaCategoria)){
      esValido = false
      this.setState({
        errorCategoria : true
      })
    }

    if(!isEmpty(objEditarCategoria)){
      if(selectedEstadoCategoria === 0 ){
        esValido = false
        this.setState({
          errorEstadoCategoria : true
        })
      }
    }
    
    if (!esValido) return
    
    const newCategoria = {
      'categoria' : datosNuevaCategoria
    }
    
    if(isEmpty(objEditarCategoria)){
      // this.newCategoria
      // newCategoria.categoria = datosNuevaCategoria
      console.log('crear',newCategoria)
      this.props.postCategoria(newCategoria)
    }

    if(!isEmpty(objEditarCategoria)){
      newCategoria.id = objEditarCategoria.id_categoria 
      newCategoria.idEstado = selectedEstadoCategoria
      console.log('editar',newCategoria)
      this.props.editCategoria(newCategoria)
    }

  }

  render(){
    console.log('newCategoria', this.props.objEditarCategoria.id_categoria)
    // console.log('propsCategoria', this.props)

    const { 
      selectedEstadoCategoria ,
      errorCategoria ,
      datosNuevaCategoria ,
      errorEstadoCategoria
    } = this.state

    const { 
      listEstado ,
      show ,
      onClose ,
      objEditarCategoria 
    } = this.props

      const optionsEstado = listEstado.map((obj) => {
        return{
          id : obj.id_estado ,
          description : obj.estado
        }
      })

    return(
      <div>
        <Modal
          show={show}
          className="middle"
          onClose={onClose}
          nameButton={`${isEmpty(objEditarCategoria) ? 'Crear' : 'Editar'}`}
          onClick={this.validarCategoria}
        >
          <h2 className="title-categoria">{isEmpty(objEditarCategoria) ? 'CREAR CATEGORIA' : 'EDITAR CATEGORIA'}</h2>
          <Input
            classNameTitle="input-categoria-subtitle"
            className="input-categoria"
            title="Escribir categoría :"
            placeholder="Nueva categoría"
            name="datosNuevaCategoria"
            onChange={this.inputChange}
            value={datosNuevaCategoria}
            error={errorCategoria}
            textError="Datos inválidos"
          />
          {
            !isEmpty(objEditarCategoria) &&
            <ComboBox
              onChange={this.inputChange}
              options={optionsEstado}
              title="Estado :"
              name="selectedEstadoCategoria"
              value={selectedEstadoCategoria}
              error={errorEstadoCategoria}
              classNameTitle="combo-categoria"
            />
          }
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  createCategoria: store.categoria.create.data,
  listEstado: store.estado.list.data,
  editCategoria : store.categoria.edit
})

const mapDispatchToProps = (dispatch) => {
  return {
  postCategoria: (objCategoria) => dispatch(createCategoria(objCategoria)),
  getEstado: () => dispatch(obtenerEstado()) ,
  putCategoria: (categoriaEditada) => dispatch(editarCategoria(categoriaEditada))
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ModalCrearCategoria)