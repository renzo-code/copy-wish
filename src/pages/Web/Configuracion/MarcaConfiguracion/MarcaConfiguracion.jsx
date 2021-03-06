import React from 'react'
import { connect } from 'react-redux'

import Tabla from '../../../../components/Tabla/Tabla'
import ComboBox from '../../../../components/ComboBox/ComboBox'
import Button from '../../../../components/Button/Button'
import ModalMarca from './components/ModalMarca'

import { list as obtenerMarca } from '../../../../actions/marca/list'
import { list as obtenerCategoria } from '../../../../actions/categoria/list'

import './MarcaConfiguracion.scss'

const dataMarca = [
  "Nª",
  "Marca",
  "Estado",
  "Categoría",
  ""
]

class MarcaConfiguracion extends React.Component{
  state = {
    selectedCategoria : null ,
    estadoModal : false ,
    objEditarMarca : {}
  }

  componentDidMount(){
    const { selectedCategoria } = this.state
    const { getCategoria, getMarca } = this.props

    getCategoria()
    getMarca(selectedCategoria)
  }

  abrirModal = () => {
    this.setState({
      estadoModal : true
    })
  }

  cerrarModal = () => {
    this.setState({
      estadoModal : false ,
      objEditarMarca : {}
    })
  }

  inputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  capturarMarca = (objMarca) => {
    this.setState({
      objEditarMarca : objMarca
    })
    this.abrirModal()
  }

  render(){
    // console.log('objEditarMarca', this.state.objEditarMarca)
    // console.log('getMarca', this.props.getMarca)

      const { estadoModal } = this.state
      const { obtenerCategoria, getMarca } = this.props

      const optionsCategoria = obtenerCategoria.map((obj)=> {
        return{
          id : obj.id_categoria ,
          description : obj.categoria
        }
      })
    
    return(
      <div>
        <div className="cont-combo-button">
          <ComboBox
            options={optionsCategoria}
            onChange={(e) => {
              this.inputChange(e)
              getMarca(e.target.value)
              console.log('e.target.value',e.target.value)
            }}
            placeholder="Escoja categoría"
            name="selectedCategoria"
            value={this.state.selectedCategoria}
          />
          <Button
            name="Crear Marca"
            className="btn-crear-marca"
            onClick={this.abrirModal}
          />
        </div>
        <Tabla
          dataCabecera={dataMarca}
          width="500px"
          gridTemplateColumns=".5fr 1.5fr 1fr 2fr 1fr"
        >
          {
            this.props.obtenerMarca.map((item, i) => {
              return(
                <div
                  className="t-row"
                  key={i}
                >
                  <div>{item.id_marca}</div>
                  <div>{item.marca}</div>
                  <div>{item.estado}</div>
                  <div >{item.categoria}</div>
                  <div>
                    <Button
                      name="Editar"
                      className="btn-editar-marca"
                      onClick={() => this.capturarMarca(item)}
                    />
                  </div>
                </div>
              )
            })
          }
        </Tabla>
        {
          estadoModal &&
          <ModalMarca
            onClose={this.cerrarModal}
            show={estadoModal}
            objEditarMarca={this.state.objEditarMarca}
            getMarca={getMarca}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  obtenerMarca : store.marca.list.data ,
  obtenerCategoria: store.categoria.list.data ,
})

const mapDispatchToProps = (dispatch) => ({
  getMarca : (num) => dispatch(obtenerMarca(num)),
  getCategoria : () => dispatch(obtenerCategoria()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MarcaConfiguracion)