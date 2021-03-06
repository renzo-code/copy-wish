import React from 'react'
import './style.scss'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import { isEmpty } from 'lodash'

import InputSearch from '../../components/InputSearch/InputSearch'
import logo from '../../Images/logo.svg'
import BlockOptions from '../../components/BlockOptions/BlockOptions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell, faShoppingCart, faHeart, faHome, faCogs, faPager } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'

class Header extends React.Component {
  state={

  }

  redireccionarMetodoPago = () => {
    this.props.history.push(`/metodo-pago`)
  }

  redireccionarPerfil = () => {
    const { history } = this.props
    history.push(`/perfil-usuario`)
  }

  exitApp = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/login')
  }

  render(){
    const localObj = JSON.parse(localStorage.getItem("jwt")) || {}
    const decode = !isEmpty(localObj) ? jwt_decode(localObj.token) : {}

    return(
    <div className="master-header">
    <div className="l-header">
      <div className="container-header">
        <div className="logo-wish">
          <img src={logo} alt="logo-wish"/>
        </div>
        <div className="search-header">
          <InputSearch/>
          <div className="container-icon">
            <div className="icon-user">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="options-icon-user">
              <div
                className="container-perfil"
                onClick={this.redireccionarPerfil}
              >
                <div className="options-icon-perfil">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="nombres-apellidos">
                  { decode?.nombres } { decode?.apellidos }
                  <div className="ver-perfil">
                    Ver el perfil
                  </div>
                </div>
              </div>
              <BlockOptions
                className="bloque"
                icon={faCogs}
                to="/configuracion/categoria"
                titleLink="Configuración"
              />
              <div
                onClick={this.redireccionarMetodoPago}
              >
                <BlockOptions
                  icon={faPager}
                  to="/metodo-pago"
                  titleLink="Métodos de pago"
                />
              </div>
              <BlockOptions
                icon={faHome}
                titleLink="Option 3"
              />
              <BlockOptions 
                icon={faHome}
                titleLink="Option 4"
              />
              <BlockOptions 
                icon={faHome}
                titleLink="Option 5"
              />
              <BlockOptions
                icon={faHome}
                titleLink="Option 6"
              />
              <BlockOptions
                icon={faHome}
                titleLink="Option 7"
              />
              <BlockOptions
                icon={faHome}
                titleLink="Option 8"
              />
              <hr className="separador"/>
              <div className="salir" onClick={this.exitApp}>
                Salir
              </div>
            </div>
          </div>
          <div className="icon-notificaciones">
            <div className="punto-rojo">·</div>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="icon-compras">
            <div className="cantidad-productos">3</div>
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <div className="icon-heart">
            <FontAwesomeIcon icon={faHeart}/>
          </div>
        </div>
      </div>
    </div>

    <>
      <div className="l-sidebar">
        <div className="items-sidebar">
          <Link className="title-item" to="/popular">Popular</Link>
        </div>
        <div className="items-sidebar">
          <Link className="title-item" to="/local">Local</Link>
        </div>
        <div className="items-sidebar">
          <Link className="title-item" to="/ofertas">Ofertas</Link>
        </div>
        <div className="items-sidebar">
          <Link className="title-item" to="/categoria">Categoría</Link>
        </div>
      </div>
    </>
  </div>
    )
  }
}

export default withRouter(Header)
