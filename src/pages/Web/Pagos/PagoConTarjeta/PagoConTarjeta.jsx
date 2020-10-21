import React from 'react'
import { connect } from 'react-redux'

import Button from '../../../../components/Button/Button'
import ModalPagoConTarjeta from './Components/ModalPagoConTarjeta'
import Tabla from '../../../../components/Tabla/Tabla'

import { list as obtenerTarjeta } from '../../../../actions/pagoTarjeta/list'

import './PagoConTarjeta.scss'

  const dataCabeceraTarjeta = [
    "Nº",
    ""
  ]

class PagoConTarjeta extends React.Component {
  state = {
    estadoModal : false,
    objEditarTarjeta : {}
  }

  componentDidMount(){
    const { getTarjeta } = this.props
    getTarjeta()
  }

  abrirModal = () => {
    this.setState({
      estadoModal : true
    })
  }

  cerrarModal = () => {
    this.setState({
      estadoModal : false,
      objEditarTarjeta : {}
    })
  }

  capturarItemTarjeta = (objTarjeta) => {
    this.setState({
      objEditarTarjeta : objTarjeta
    })
    this.abrirModal()
  }

  render(){
    // console.log('props',this.state.objEditarTarjeta)

    const { estadoModal, objEditarTarjeta } = this.state
    const { listTarjeta } = this.props

    return(
      <div className="master-pago-tarjeta">
        <h2 className="title-registrar-tarjeta">Registrar Tarjeta</h2>
        <div className="container-registro-tarjeta">
          <Button
            name="Agregar"
            className="btn-agregar-tarjeta"
            onClick={this.abrirModal}
          />
          <Tabla
            frame="50px 70px"
            dataCabecera={dataCabeceraTarjeta}
          >
            {
              listTarjeta.map((item,i) => {
                return(
                  <div
                  className="cont-items-listar"
                    key={i}
                    style={{ gridTemplateColumns: "50px 70px"}}
                    >
                    <div className="items-listar">{item.id_tarjeta_usuario}</div>
                    <div className="items-listar ultimo-item">
                      <Button
                        name="Editar"
                        className="btn-editar-marca"
                        onClick={() => this.capturarItemTarjeta(item)}
                      />
                    </div>
                  </div>
                )
              })
            }
          </Tabla>
          {
            estadoModal &&
            <ModalPagoConTarjeta
              show={estadoModal}
              onClose={this.cerrarModal}
              objEditarTarjeta={objEditarTarjeta}
            />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => ({
  listTarjeta : store.pagoTarjeta.list.data
})

const mapDispatchToProps = (dispatch) => ({
  getTarjeta : () => dispatch(obtenerTarjeta())
})

export default connect(mapStateToProps, mapDispatchToProps)(PagoConTarjeta)