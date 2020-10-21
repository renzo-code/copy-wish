import { httpGet } from '../../utils'

export function error(error) {
  return {
    type: 'PAGO_TARJETA_LIST_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'PAGO_TARJETA_LIST_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'PAGO_TARJETA_LIST_SUCCESS',
    data
  }
}

export function list(id, page = '/tarjeta') {
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