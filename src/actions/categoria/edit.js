import { httpPut } from '../../utils'

export function error(error) {
  return{
    type: 'CATEGORIA_EDIT_ERROR',
    error
  }
}

export function loading(loading) {
  return{
    type: 'CATEGORIA_EDIT_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'CATEGORIA_EDIT_SUCCESS',
    data
  }
}

export function edit(obj, page= '/categoria'){
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPut(page, obj)
    .then((data) => {
      dispatch(loading(true))
      dispatch(loading(data.reply))
    })
    .catch((e) => {
      dispatch(loading(false))
      dispatch(error(e))
    })
  }
}