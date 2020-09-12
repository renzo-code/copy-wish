import React from 'react'
import './ButtonStyle.scss'

const Button = (props) =>{
  return(
    <div>
      <h2>{props.title}</h2>
      <button
        onClick={props.onClick}
        className={`button-master ${props.className}`}
      >
        {props.nameButton}
      </button>
      
    </div>
  )
}

export default Button