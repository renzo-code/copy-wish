import React from 'react'
import './InputSearchStyle.scss'


const InputSearch = () => {
  return(
    <div className="master-search">
      <input className="input-search" placeholder="¿Qué quieres encontrar?" type="text"/>
      <button className="btn-search">Buscar</button>
    </div>
  )
}

export default InputSearch