import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'CATEGORIA_CREATE_ERROR':
      return action.error

    case 'CATEGORIA_CREATE_RESET':
      return null

    default:
      return state
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'CATEGORIA_CREATE_LOADING':
      return action.loading

    case 'CATEGORIA_CREATE_RESET':
      return false

    default:
      return state
  }
}

export function data(state = {}, action) {
  switch (action.type) {
    case 'CATEGORIA_CREATE_SUCCESS':
      return action.data

    case 'CATEGORIA_CREATE_RESET':
      return {}

    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})