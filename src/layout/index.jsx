import React from 'react'
import './style.scss'

import Header from './Header/Header'


const Layout = (props) => {
  return(
    <>
      <Header />
      <div className="l-content">
        <div className="l-body">
          {props.children}
        </div>
      </div>
    </>
  )
}

export default Layout