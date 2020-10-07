import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'MARCA_CREATE_ERROR':
      return action.error

    case 'MARCA_CREATE_RESET':
      return null

    default:
      return state
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'MARCA_CREATE_LOADING':
      return action.loading
    
    case 'MARCA_CREATE_RESET':
      return false
    
    default:
      return state
  }
}

export function data(state = {}, action) {
  switch(action.type) {
    case 'MARCA_CREATE_SUCCESS':
      return action.data

    case 'MARCA_CREATE_RESET':
      return {}
    
    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})