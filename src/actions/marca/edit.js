import { httpPut } from '../../utils'

export function error(error) {
  return {
    type: 'MARCA_EDIT_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'MARCA_EDIT_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'MARCA_EDIT_SUCCESS',
    data
  }
}

export function edit(obj, page= '/marca'){
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
  return{
    type: 'MARCA_EDIT_RESET'
  }
}