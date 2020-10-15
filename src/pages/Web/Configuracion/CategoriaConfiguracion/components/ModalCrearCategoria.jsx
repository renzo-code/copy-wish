import React from 'react'

import Modal from '../../../../../components/Modal/Modal'
import Input from '../../../../../components/Input/Input'
import ComboBox from '../../../../../components/ComboBox/ComboBox'

import { create as createCategoria, reset as resetCreateCategoria } from '../../../../../actions/categoria/create'
import { list as obtenerEstado } from '../../../../../actions/estado/list'
import { edit as editarCategoria, reset as resetPutCategoria } from '../../../../../actions/categoria/edit'

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

  componentDidUpdate(prevProps){
    const { createCategoria, getCategoria, onClose, editCategoria } = this.props

    if(prevProps.createCategoria !== createCategoria) {
      console.log('updated create marca')
      getCategoria()
      onClose()
    }
    console.log('revProps.editCategoria ', prevProps.editCategoria, editCategoria )
    if(prevProps.editCategoria !== editCategoria) {
      console.log('updated edit marca')
      getCategoria()
      onClose()
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!isEmpty(nextProps.objEditarCategoria) && nextProps.objEditarCategoria !== prevState.objEditarCategoria){
      return {
        objEditarCategoria : nextProps.objEditarCategoria,
        datosNuevaCategoria : nextProps.objEditarCategoria.categoria,
        selectedEstadoCategoria : nextProps.objEditarCategoria.id_estado
      }
    }
    return null
  }

  componentWillUnmount(){
    const { resetPutCategoria,resetCreateCategoria } = this.props
    resetCreateCategoria()
    resetPutCategoria()
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

    const { 
      objEditarCategoria,
      postCategoria,
      putCategoria
    } = this.props

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
      postCategoria(newCategoria)
    }

    if(!isEmpty(objEditarCategoria)){
      newCategoria.id = objEditarCategoria.id_categoria 
      newCategoria.idEstado = selectedEstadoCategoria
      console.log('editar',newCategoria)
      putCategoria(newCategoria)
    }
  }

  render(){
    console.log('editCategoria', this.props.editCategoria)
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
  editCategoria: store.categoria.edit.data
})

const mapDispatchToProps = (dispatch) => {
  return {
  postCategoria: (objCategoria) => dispatch(createCategoria(objCategoria)),
  resetCreateCategoria: () => dispatch(resetCreateCategoria()),
  getEstado: () => dispatch(obtenerEstado()),
  putCategoria: (categoriaEditada) => dispatch(editarCategoria(categoriaEditada)),
  resetPutCategoria: () => dispatch(resetPutCategoria())
  }
}
export default connect( mapStateToProps, mapDispatchToProps)(ModalCrearCategoria)