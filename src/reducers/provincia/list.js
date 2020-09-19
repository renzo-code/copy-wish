import { combineReducers } from 'redux'

export function error(state = null, action) {
  switch (action.type) {
    case 'PROVINCIA_LIST_ERROR':
      return action.error

    case 'PROVINCIA_LIST_RESET':
      return null

    default:
      return state
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'PROVINCIA_LIST_LOADING':
      return action.loading

    case 'PROVINCIA_LIST_RESET':
      return false

    default:
      return state
  }
}

export function data(state = [], action) {
  switch (action.type) {
    case 'PROVINCIA_LIST_SUCCESS':
      return action.data

    case 'PROVINCIA_LIST_RESET':
      return []

    default: 
      return state
  }
}

export default combineReducers({
  error, loading, data
})