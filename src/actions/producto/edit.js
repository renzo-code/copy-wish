import { httpPut } from '../../utils'

export function error(error) {
  return {
    type: 'PRODUCTO_EDIT_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'PRODUCTO_ERDIT_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'PRODUCTO_EDIT_SUCCESS',
    data
  }
}

export function edit(obj, page = '/producto'){
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPut(page, obj)
    .then((data) => {
      dispatch(loading(true))
      dispatch(success(data.reply))
    })
    .catch((e) => {
      dispatch(loading(false))
      dispatch(error(e))
    })
  }
}

export function reset() {
  return {
    type: 'PRODUCTO_EDIT_RESET'
  }
}