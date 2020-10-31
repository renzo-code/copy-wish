import React from 'react'
import { connect } from 'react-redux'

import Modal from '../../../../../components/Modal/Modal'
import Input from '../../../../../components/Input/Input'
import ComboBox from '../../../../../components/ComboBox/ComboBox'

import { list as obtenerCategoria } from '../../../../../actions/categoria/list'
import { list as obtenerEstado } from '../../../../../actions/estado/list'
import { list as obtenerMarca } from '../../../../../actions/marca/list'
import { create as crearProducto } from '../../../../../actions/producto/create'
import { edit as editarProducto, reset as resetEditarProducto } from '../../../../../actions/producto/edit'
import { list as obtenerProducto } from '../../../../../actions/producto/list'

import './ModalProductoConfiguracion.scss'
import { isEmpty } from 'lodash'

class ModalProductoConfiguracion extends React.Component {
  state = {
    inputNombreProducto : '',
    inputPrecioProducto : '',
    inputStock : '',

    selectedCategoria : 0,
    selectedEstado : 0,
    selectedMarca : 0,

    errorInputNombreProducto : false,
    errorInputPrecioProducto : false,
    errorComboBoxCategoria : false,
    errorComboBoxEstado : false,
    errorComboBoxMarca : false,
  }

  componentDidMount(){
    const { getCategoria, getEstado, getMarca, objEditarProducto, getProducto } = this.props
    const { selectedCategoria } = this.state
    if(!isEmpty(objEditarProducto)){
      getEstado()
    }
    getCategoria()
    getMarca(selectedCategoria)
    getProducto(objEditarProducto.id_categoria)
  }

  componentDidUpdate(prevProps, prevState){
    const { createProducto, getProducto, objEditarProducto, onClose, editProducto } = this.props
    if(prevProps.createProducto !== createProducto){
      getProducto(objEditarProducto.id_categoria)
      onClose()
    }
    if(prevProps.editProducto !== editProducto){
      getProducto(objEditarProducto.id_categoria)
      onClose()
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if(!isEmpty(nextProps.objEditarProducto) && nextProps.objEditarProducto !== prevState.objEditarProducto) {
      return {
        objEditarProducto : nextProps.objEditarProducto,
        selectedCategoria : nextProps.objEditarProducto.id_categoria,
        selectedMarca : nextProps.objEditarProducto.id_marca,
        inputNombreProducto : nextProps.objEditarProducto.nombre,
        inputPrecioProducto : nextProps.objEditarProducto.precio,
        selectedEstado : nextProps.objEditarProducto.id_estado,
        inputStock : nextProps.objEditarProducto.stock
      }
    }
    return null
  }

  componentWillMount(){
    const { resetPutProducto } = this.props
    resetPutProducto()
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  validarProducto = () => {
    this.setState({
      errorInputNombreProducto : false,
      errorInputPrecioProducto : false,
      errorComboBoxCategoria : false,
      errorComboBoxEstado : false,
      errorComboBoxMarca : false
    })

    let esValido = true

    const {
      inputNombreProducto,
      inputPrecioProducto,
      selectedCategoria,
      selectedEstado,
      selectedMarca,
      inputStock
    } = this.state

    const {
      postProducto,
      objEditarProducto,
      putProducto
    } = this.props

    const expresionesNumeros = /^[0-9]+$/i

    if(inputNombreProducto === ''){
      esValido = false
      this.setState({
        errorInputNombreProducto : true
      })
    }

    if(inputPrecioProducto === '' || expresionesNumeros.exec(inputPrecioProducto)){
      esValido = false
      this.setState({
        errorInputPrecioProducto : true
      })
    }

    if(selectedCategoria === 0){
      esValido = false
      this.setState({
        errorComboBoxCategoria : true
      })
    }

    if(!isEmpty(objEditarProducto)){
      if(selectedEstado === 0){
        esValido = false
        this.setState({
          errorComboBoxEstado : true
        })
      }
    }

    if(selectedMarca === 0){
      esValido = false
      this.setState({
        errorComboBoxMarca : true
      })
    }

    if(inputStock === ''){
      esValido = false
      this.setState({
        errorInputStockProducto : true
      })
    }

    if(!esValido) return

    const nuevoProducto = {
      "nombre" : inputNombreProducto,
      "precio" : inputPrecioProducto,
      "idCategoria" : selectedCategoria,
      "idMarca" : selectedMarca,
      "stock" : inputStock
    }

    if(isEmpty(objEditarProducto)){
      postProducto(nuevoProducto)
    }
    
    if(!isEmpty(objEditarProducto)){
      nuevoProducto.idProducto = objEditarProducto.id_producto
      putProducto(nuevoProducto)
    }
  }

  render(){
    console.log('props', this.props.objEditarProducto)
    const { 
      show, 
      onClose,
      listCategoria,
      listEstado,
      listMarca,
      getMarca,
      objEditarProducto
    } = this.props

    const { 
      inputNombreProducto, 
      inputPrecioProducto,
      inputStock,
      selectedCategoria,
      selectedEstado,
      selectedMarca,
      errorInputNombreProducto,
      errorInputPrecioProducto,
      errorComboBoxCategoria,
      errorComboBoxEstado,
      errorComboBoxMarca,
      errorInputStockProducto
    } = this.state
    
    const optionsCategoria = listCategoria.map((obj) => {
      return {
        id: obj.id_categoria,
        description: obj.categoria
      }
    })
    
    const optionsEstado = listEstado.map((obj)=> {
      return {
        id : obj.id_estado,
        description : obj.estado
      }
    })

    const optionsMarca = listMarca.map((obj)=>{
      return {
        id: obj.id_marca,
        description : obj.marca
      }
    })

    return(
      <div>
        <Modal
          show={show}
          onClose={onClose}
          className="middle"
          nameButton={`${isEmpty(objEditarProducto) ? "Crear" : "Editar"}`}
          onClick={this.validarProducto}
        >
          <h2 className="title-crear-marca">{`${isEmpty(objEditarProducto) ? "Crear Nuevo Producto" : "Editar Nuevo Producto"}`}</h2>
          <ComboBox
            onChange={(e)=> {
              this.inputChange(e)
              getMarca(e.target.value)
            }}
            value={selectedCategoria}
            name="selectedCategoria"
            options={optionsCategoria}
            placeholder="Seleccionar Categoría"
            error={errorComboBoxCategoria}
            textError="Datos Inválidos"
          />
            <ComboBox
              onChange={this.inputChange}
              name="selectedMarca"
              value={selectedMarca}
              options={optionsMarca}
              placeholder="Marca"
              error={errorComboBoxMarca}
              textError="Datos Inválidos"
            />
          <Input
            className="input-nombre-producto"
            placeholder="Nombre producto"
            onChange={this.inputChange}
            name="inputNombreProducto"
            value={inputNombreProducto}
            error={errorInputNombreProducto}
            textError="Datos Inválidos"
          />
          <Input
            className="input-nombre-producto"
            placeholder="Precio"
            onChange={this.inputChange}
            name="inputPrecioProducto"
            value={inputPrecioProducto}
            error={errorInputPrecioProducto}
            textError="Datos Inválidos"
          />
          {
            !isEmpty(objEditarProducto) &&
            (
              <ComboBox
                onChange={this.inputChange}
                name="selectedEstado"
                value={selectedEstado}
                placeholder="Estado"
                options={optionsEstado}
                error={errorComboBoxEstado}
                textError="Datos Inválidos"
              />
            )
          }
          <Input
            className="input-nombre-producto"
            onChange={this.inputChange}
            name="inputStock"
            value={inputStock}
            placeholder="Stock de producto"
            error={errorInputStockProducto}
            textError="Datos Inválidos"
          />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  listCategoria : store.categoria.list.data,
  listEstado : store.estado.list.data,
  listMarca : store.marca.list.data,
  createProducto : store.producto.create.data,
  editProducto : store.producto.edit.data,
  listProducto : store.producto.list.data
})
const mapDisptachToProps = (dispatch) => ({
  getCategoria : () => dispatch(obtenerCategoria()),
  getEstado : () => dispatch(obtenerEstado()),
  getMarca : (id) => dispatch(obtenerMarca(id)),
  postProducto : (newProducto) => dispatch(crearProducto(newProducto)),
  putProducto : (productoEditado) => dispatch(editarProducto(productoEditado)),
  resetPutProducto : () => dispatch(resetEditarProducto()),
  getProducto : () => dispatch(obtenerProducto()),
})

export default connect(mapStateToProps, mapDisptachToProps)(ModalProductoConfiguracion)