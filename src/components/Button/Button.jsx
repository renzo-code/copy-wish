import React from 'react'
import './ButtonStyle.scss'

const Button = (props) =>{
  return(
    <>
      <h2>{props.title}</h2>
      <button
        onClick={props.onClick}
        className={`button-master ${props.className}`}
      >
        {props.name}
      </button>
    </>
  )
}

export default Button