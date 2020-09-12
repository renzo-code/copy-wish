import React from 'react'

import './style.scss'

const Body = (props) => {
  return(
    <div className="l-body">
      {props.children}
    </div>
  )
}

export default Body