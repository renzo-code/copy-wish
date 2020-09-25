import React from 'react'
import { Link } from 'react-router-dom'

import './LayoutConfiguracion.scss'

class LayoutConfiguracion extends React.Component{
  state= {

  }

  render(){
    const { children } = this.props
    return(
    <>
      <div className="title-banner">
          CONFIGURACIÓN
      </div>
      <div className="container-configuracion">
        <div className="sidebar-configuracion">
          <div className="cont-link-congifuracion">
            <Link
              className="link-sidebar-configuracion"
              to="/configuracion/categoria"
            >
              Categoría
            </Link>
          </div>
          <div className="cont-link-congifuracion">
            <Link
              className="link-sidebar-configuracion"
              to="/configuracion/marca"
            >
              Marcas
            </Link>
          </div>
          <div className="cont-link-congifuracion">
            <Link
              className="link-sidebar-configuracion"
              to="/configuracion/producto"
            >
              Productos
            </Link>
          </div>
        </div>
        <div className="contenido-configuracion">
          {children}
        </div>
      </div>
    </>
    )
  }
}

export default LayoutConfiguracion