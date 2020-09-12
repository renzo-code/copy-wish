import React from 'react'
import './InputStyle.scss'

const Input = (props) => {
  return(
  <div>
    {props.title && <h2>{props.title}</h2>}
    <input
      onChange={props.onChange}
      className={` input-master ${props.error ? 'color-error' : ''} ${props.className}`}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
      name={props.name}
    />
    {props.error && <p className="parrafo-input">{props.error}</p>}
  </div>
  )
}

export default Input