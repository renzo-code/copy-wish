import React from 'react'
import './BlockOptionsStyle.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'
import {  } from '@fortawesome/free-brands-svg-icons'

const BlockOption = (props) => {
  return(
    <>
      <div className="option-1">
        <div className="icon-option-1">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        {props.texto}
      </div>
    </>
  )
}

export default BlockOption