import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

import InputSearch from '../../components/InputSearch/InputSearch'
import logo from '../../Images/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faBell, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'

const Header = () => {
  return(
    <div>
      <div className="l-header">
        <div className="container-header">
          <div className="logo-wish">
            <img src={logo} alt="logo-wish"/>
          </div>
          <div className="search-header">
            <InputSearch/>
            <div className="icon-user">
              <FontAwesomeIcon icon={faUser} />
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

      <div>
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
      </div>
    </div>
  )
}
export default Header
