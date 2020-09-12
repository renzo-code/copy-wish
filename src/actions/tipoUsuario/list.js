import { httpGet } from '../../utils/index'

export function error(error) {
  return {
    type: 'TIPO_USUARIO_LIST_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'TIPO_USUARIO_LIST_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'TIPO_USUARIO_LIST_SUCCESS',
    data
  }
}

export function list(obj, page = '/tipo') {
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpGet(page, obj)
      .then((data)=>{
        dispatch(loading(false))
        dispatch(success(data.reply))
      })
      .catch((e)=>{
        dispatch(loading(false))
        dispatch(error('Hubo un error'))
      })
  }
}