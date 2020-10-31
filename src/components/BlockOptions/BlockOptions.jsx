import React from 'react'
import './BlockOptionsStyle.scss'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'

const BlockOption = (props) => {

  return(
    <>
      <div className={`option-1 ${props.classNameCont}`}>
        { props.icon &&
          <div className="icon-option-1">
            <FontAwesomeIcon icon={props.icon} />
          </div>
        }
          <Link className={`link-configuracion ${props.className}`} to={props.to} >
            {props.titleLink}
          </Link>
        {props.texto}
      </div>
    </>
  )
}

export default BlockOption