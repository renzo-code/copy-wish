import { combineReducers } from 'redux'

import departamento from './departamento'
import tipoUsuario from './tipoUsuario'
import estado from './estado'
import login from './login'
import provincia from './provincia'
import distrito from './distrito'
import usuario from './usuario'
import categoria from './categoria'
import marca from './marca'
import fotoPerfil from './fotoPerfil'
import pagoTarjeta from './pagoTarjeta'



export default combineReducers({
  departamento,
  tipoUsuario,
  estado,
  login,
  provincia,
  distrito,
  usuario,
  categoria,
  marca,
  fotoPerfil,
  pagoTarjeta
})