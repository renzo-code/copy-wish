import React from 'react'
import Tabla from '../../../../components/Tabla/Tabla'
import { connect } from 'react-redux'

import './CategoriaConfiguracion.scss'
import Button from '../../../../components/Button/Button'
import ModalCrearCategoria from './components/ModalCrearCategoria'

import { create } from '../../../../actions/categoria/create'
import { list as obtenerCategoria } from '../../../../actions/categoria/list'


const dataCategoria = [
  "Nª",
  "Categoría",
  "Estado",
  ""
]

class CategoriaConfiguracion extends React.Component {
  state = {
    estadoModal : false,
    objEditarCategoria : {}
  }

  componentDidMount(){
    const { getCategoria } = this.props
    getCategoria()
  }

  abrirModal = () => {
    this.setState({
      estadoModal : true
    })
  }

  cerrarModal = () => {
    this.setState({
      estadoModal: false ,
      objEditarCategoria : {}
    })
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  capturarCategoria = (objCategoria) => {
    this.setState({
      objEditarCategoria : objCategoria
    })
    this.abrirModal()
  }

  render(){
    // console.log('listarEstado', this.props.listarEstado)
    // console.log('objEditarCategoria',this.state.objEditarCategoria)

    const { estadoModal, objEditarCategoria } = this.state
    const { listarCategoria, getCategoria } = this.props

    return(
      <div>
        <Button
          className="btn-categoria"
          name="Crear categoría"
          onClick={this.abrirModal}
        />
        <Tabla
          frame="50px 150px 100px 70px"
          dataCabecera={dataCategoria}
        >
          {
            listarCategoria.map((item,i) =>{
              return(
                <div
                  className="cont-items-listar"
                  key={i}
                  style={{ gridTemplateColumns: "50px 150px 100px 70px" }}
                >
                  <div className="items-listar">{item.id_categoria}</div>
                  <div className="items-listar">{item.categoria}</div>
                  <div className="items-listar ultimo-item">{item.estado}</div>
                  <div className="item-btn-editar-marca">
                    <Button
                      name="Editar"
                      className="btn-editar-marca"
                      onClick={() =>this.capturarCategoria(item)}
                    />
                  </div>
                </div>
              )
            })
          }
        </Tabla>
          {
            estadoModal && <ModalCrearCategoria
              onClose={this.cerrarModal}
              show={estadoModal}
              objEditarCategoria={objEditarCategoria}
              getCategoria={getCategoria}
            />
          }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  createCategoria: store.categoria.create.data,
  listarCategoria: store.categoria.list.data,
  listarEstado: store.estado.list.data
})

const mapDispatchToProps = (dispatch) => ({
  postCategoria: () => dispatch(create()),
  getCategoria: () => dispatch(obtenerCategoria()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaConfiguracion)