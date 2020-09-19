import React from 'react'
import './InputStyle.scss'

const Input = (props) => {
  return(
  <div>
    {props.title && <h3 className="title-input" >{props.title}</h3>}
    <input
      onChange={props.onChange}
      className={` input-master ${props.error ? 'color-error' : ''} ${props.className}`}
      placeholder={props.placeholder}
      value={props.value}
      name={props.name}
      type={props.type}
      min={props.min}
      max={props.max}
    />
    {props.error && props.textError && <p className="parrafo-input">{props.textError}</p>}
  </div>
  )
}

export default Input

// const reg = /^[a-z]+$/i;