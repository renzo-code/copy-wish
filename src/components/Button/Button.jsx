import React from 'react'
import './ButtonStyle.scss'

const Button = (props) =>{
  return(
    <>
      { props.title && <h2>{props.title}</h2>}
      <button
        onClick={props.onClick}
        className={`button-master ${props.className}`}
        disabled={props.disabled}
      >
        {props.name}
      </button>
    </>
  )
}

export default Button