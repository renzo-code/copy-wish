import React from 'react'
import { connect } from 'react-redux'

import ModalProductoConfiguracion from './components/ModalProductoConfiguracion'
import Button from '../../../../components/Button/Button'
import Tabla from '../../../../components/Tabla/Tabla'
import ComboBox from '../../../../components/ComboBox/ComboBox'

import { list as obtenerProducto } from '../../../../actions/producto/list'
import { list as obtenerCategoria } from '../../../../actions/categoria/list'

import './ProductoConfiguracion.scss'

  const dataCabeceraProducto = [
    "Nº",
    "Nombre",
    "Precio",
    "Categoria",
    "Estado",
    "Marca",
    "Stock",
    ""
  ]

  class ProductoConfiguracion extends React.Component{
    state = {
      estadoModal : false,
      objEditarProducto : {},
      selectedCategoriaProducto : 0
    }

  componentDidMount(){
    const { getProducto, getCategoria } = this.props
    const { selectedCategoriaProducto } = this.state
    getCategoria()
    if(selectedCategoriaProducto !== 0){
      getProducto(selectedCategoriaProducto)
    }
  }

  abrirModal = () => {
    this.setState({
      estadoModal : true
    })
  }

  cerrarModal = () => {
    this.setState({
      estadoModal : false,
      objEditarProducto : {}
    })
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  capturarProducto = (itemProd) => {
    this.setState({
      objEditarProducto : itemProd
    })
    this.abrirModal()
  }

  render(){
    console.log('props', this.props)
    console.log('asd', this.state.selectedCategoriaProducto)
    const { estadoModal, objEditarProducto, selectedCategoriaProducto } = this.state
    const { listProducto, listCategoria, getProducto } = this.props

    const optionsCategoriaProducto = listCategoria.map((obj) => {
      return{
        id : obj.id_categoria,
        description : obj.categoria
      }
    })

    return(
      <div>
        <div className="btn-crear-modal-prod">
          <ComboBox
            options={optionsCategoriaProducto}
            onChange={(e) => {
              this.inputChange(e)
              getProducto(e.target.value)
            }}
            value={selectedCategoriaProducto}
            name="selectedCategoriaProducto"
            placeholder="Escoja una Categoría"
          />
          <Button
            name="Nuevo producto"
            onClick={this.abrirModal}
          />
        </div>
          <Tabla
            frame="50px 150px 120px 150px 90px 120px 90px 80px"
            dataCabecera={dataCabeceraProducto}
          >
            {
              listProducto.map((item, i) => {
                return(
                  <div
                    className="cont-items-listar"
                    key={i}
                    style={{ gridTemplateColumns: "50px 150px 120px 150px 90px 120px 90px 80px" }}
                  >
                    <div className="items-listar">{item.id_producto}</div>
                    <div className="items-listar">{item.nombre}</div>
                    <div className="items-listar">{item.precio}</div>
                    <div className="items-listar">{item.categoria}</div>
                    <div className="items-listar">{item.estado}</div>
                    <div className="items-listar">{item.marca}</div>
                    <div className="items-listar ultimo-item">{item.stock}</div>
                    <div className="item-btn-editar-producto">
                      <Button
                        className="btn-editar-producto"
                        name="Editar"
                        onClick={() => this.capturarProducto(item)}
                      />
                    </div>
                  </div>
                )
              })
            }
          </Tabla>
        {
          estadoModal && 
          <ModalProductoConfiguracion
            show={estadoModal}
            onClose={this.cerrarModal}
            objEditarProducto={objEditarProducto}
            getProducto={getProducto}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  listProducto : store.producto.list.data,
  listCategoria : store.categoria.list.data
})

const mapDispatchToProps = (dispatch) => ({
  getProducto : (num) => dispatch(obtenerProducto(num)),
  getCategoria : () => dispatch(obtenerCategoria())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductoConfiguracion)