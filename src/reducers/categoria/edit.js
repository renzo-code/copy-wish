import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'CATEGORIA_EDIT_ERROR':
      return action.error

    case 'CATEGORIA_EDIT_RESET':
      return null

    default:
      return state
  }
}

export function loading(state = false, action) {
  switch(action.type) {
    case 'CATEGORIA_EDIT_LOADING':
      return action.loading

    case 'CATEGORIA_EDIT_RESET':
      return false

    default:
      return state
  }
}

export function data(state = {}, action) {
  switch(action.type) {
    case 'CATEGORIA_EDIT_SUCCESS':
      return action.data

    case 'CATEGORIA_EDIT_RESET':
      return {}
      
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})