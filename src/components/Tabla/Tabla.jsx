import React from 'react'

import './Tabla.scss'

const Tabla = (props) => {
  return(
    <div>
      <div
        className="container-item-tabla"
        style={{ gridTemplateColumns: props.frame }}
      >
        {
          props.dataCabecera.map((item, i) => {
            return <div key={i} className="items " >{item}</div>
          })
        }
      </div>
      {props.children}
    </div>
  )
}

export default  Tabla