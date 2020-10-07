import React from 'react'
import './ComboBoxStyle.scss'

const ComboBox = (props) => {
  return(
    <>
      {props.title && <h2 className={`title-combo-box ${props.classNameTitle}`}>{props.title}</h2>}
      <select
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={`combo-box ${props.error ? 'color-error' : ''} ${props.className}`}
        name={props.name}
        disabled={props.disabled}
      >
        {
          [{id: 0 , description: props.placeholder}, ...props.options].map((obj, i)=>
            <option 
              className="combo-box-option" 
              hidden={ i === 0 } 
              key={i} 
              value={obj.id}
            > 
              {obj.description} 
            </option>
            )
        }
      </select>
    </>
  )
}

export default ComboBox