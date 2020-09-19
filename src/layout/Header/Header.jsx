import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode"

import InputSearch from '../../components/InputSearch/InputSearch'
import logo from '../../Images/logo.svg'
import BlockOptions from '../../components/BlockOptions/BlockOptions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell, faShoppingCart, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'

const Header = () => {
  const localObj = JSON.parse(localStorage.getItem("jwt"))
  // console.log('localObj',localObj.token)

  const decode = jwt_decode(localObj.token)

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
                <div className="container-perfil">
                  <div className="options-icon-perfil">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="nombres-apellidos">
                    { decode.nombres } { decode.apellidos }
                    <div className="ver-perfil">
                      <Link className="link-usuario" to="/perfil-usuario">Ver el perfil</Link>
                    </div>
                  </div>
                </div>
                <BlockOptions
                  icon={faHome}
                  texto="Option 1"
                />
                <BlockOptions
                  icon={faHome}
                  texto="Option 2"
                />
                <BlockOptions 
                  icon={faHome}
                  texto="Option 3"
                />
                <BlockOptions 
                  icon={faHome}
                  texto="Option 4"
                />
                <BlockOptions 
                  icon={faHome}
                  texto="Option 5"
                />
                <BlockOptions
                  icon={faHome}
                  texto="Option 6"
                />
                <BlockOptions
                  icon={faHome}
                  texto="Option 7"
                />
                <BlockOptions
                  icon={faHome}
                  texto="Option 8"
                />
                <hr className="separador"/>
                <div className="salir">
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

export default Header
