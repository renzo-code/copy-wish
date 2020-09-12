import { combineReducers } from 'redux'

import departamento from './departamento'
import tipoUsuario from './tipoUsuario'
import estado from './estado'
import login from './login'


export default combineReducers({
  departamento, tipoUsuario, estado, login
})

