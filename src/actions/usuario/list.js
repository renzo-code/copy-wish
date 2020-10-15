import { httpGet } from '../../utils/index'

export function error(error) {
  return {
    type: 'USUARIO_LIST_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'USUARIO_LIST_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'USUARIO_LIST_SUCCESS',
    data
  }
}

export function list(id, page = '/usuario') {
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpGet(page, id)
    .then((data) => {
      dispatch(loading(false))
      dispatch(success(data.reply))
    })
    .catch((e) => {
      dispatch(loading(false))
      dispatch(error(e))
    })
  }
}