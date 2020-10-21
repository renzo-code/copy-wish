import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'PAGO_TARJETA_EDIT_ERROR':
      return action.error

    case 'PAGO_TARJETA_EDIT_RESET':
      return null

    default:
      return state
  }
}

export function loading(state = false, action) {
  switch(action.type) {
    case 'PAGO_TARJETA_EDIT_LOADING':
      return action.loading

    case 'PAGO_TARJETA_EDIT_RESET':
      return false

    default:
      return state
  }
}

export function data(state = {}, action) {
  switch(action.type) {
    case 'PAGO_TARJETA_EDIT_SUCCESS':
      return action.data

    case 'PAGO_TARJETA_EDIT_RESET':
      return {}

    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})