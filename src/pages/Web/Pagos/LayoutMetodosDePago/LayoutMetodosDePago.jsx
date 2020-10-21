import React from 'react'

import BlockOptions from '../../../../components/BlockOptions/BlockOptions'

import './LayoutMetodosDePago.scss'

class LayoutMetodosDePago extends React.Component {
  state = {

  }

  render(){

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
            <BlockOptions
              classNameCont="cont-opcion-tarjeta"
              className="opcion-tarjeta"
              to="/metodo-pago/tarjeta"
              titleLink="Con tarjeta"
            />
            <BlockOptions
              to="/metodo-pago/2"
              titleLink="Opción 2"
            />
          </div>
          <div className="cont-cuerpo">
            {children}
          </div>
        </div>
      </>
    )
  }
}

export default LayoutMetodosDePago