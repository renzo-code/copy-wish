import { httpPost } from '../../utils'

export function error(error) {
  return {
    type: 'CATEGORIA_CREATE_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'CATEGORIA_CREATE_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'CATEGORIA_CREATE_SUCCESS',
    data
  }
}

export function create(obj, page = '/categoria') {
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPost(page, obj)
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

export function reset(){
  return{
    type: 'CATEGORIA_CREATE_RESET'
  }
}