import { httpPost } from '../../utils'

export function error(error) {
  return {
    type: 'USUARIO_CREATE_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'USUARIO_CREATE_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'USUARIO_CREATE_SUCCESS',
    data
  }
}

export function create(obj, page= '/usuario') {
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
