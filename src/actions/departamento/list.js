import { httpGet } from '../../utils/index'

export function error(error) {
  return {
    type: 'DEPARTAMENTO_LIST_ERROR',
    error,
  }
}

export function loading(loading) {
  return {
    type: 'DEPARTAMENTO_LIST_LOADING',
    loading,
  }
}

export function success(data) {
  return {
    type: 'DEPARTAMENTO_LIST_SUCCESS',
    data,
  }
}

export function list(obj, page = '/departamento') {
  return (dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpGet(page, obj)
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