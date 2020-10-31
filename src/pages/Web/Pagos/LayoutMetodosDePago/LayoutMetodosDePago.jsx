import React from 'react'
import { withRouter } from 'react-router-dom'

import BlockOptions from '../../../../components/BlockOptions/BlockOptions'

import './LayoutMetodosDePago.scss'

class LayoutMetodosDePago extends React.Component {
  state = {

  }

  redireccionar = () => {
    this.props.history.push(`/metodo-pago/tarjeta`)
    
  }

  redireccionarPago2 = () => {
    this.props.history.push(`/metodo-pago/2`)
  }

  render(){
    console.log('this.props.history',this.props.history)
    const {
      children
    } = this.props

    return(
      <>
        <div className="borde-titulo-pagina" > 
          <h1 className="titulo-pagina">MÉTODOS DE PAGO</h1>
        </div>

        <div className="container-master">
          <div className="cont-sidebar">
            <div
              onClick={this.redireccionar}
            >
              <BlockOptions
                classNameCont="cont-blockOptions"
                className="opcion-tarjeta"
                to="/metodo-pago/tarjeta"
                titleLink="Con tarjeta"
              />
            </div>
            <div
              onClick={this.redireccionarPago2}
            >
              <BlockOptions
                classNameCont="cont-blockOptions"
                to="/metodo-pago/2"
                titleLink="Opción 2"
              />
            </div>
          </div>
          <div className="cont-cuerpo">
            {children}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(LayoutMetodosDePago)