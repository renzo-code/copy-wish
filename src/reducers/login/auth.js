import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'LOGIN_POST_ERROR':
      return action.error

    case 'LOGIN_POST_RESET':
      return null

    default:
      return state
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'LOGIN_POST_LOADING':
      return action.loading

    case 'LOGIN_POST_RESET':
      return false

    default:
      return state
  }
}

export function data(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_POST_SUCCESS':
      return action.data
    
    case 'LOGIN_POST_RESET':
      return {}

    default:
      return state
  }
}

export default combineReducers({
  error, loading, data
})