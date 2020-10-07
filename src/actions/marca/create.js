import { httpPost } from '../../utils'

export function error(error) {
  return {
    type: 'MARCA_CREATE_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'MARCA_CREATE_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'MARCA_CREATE_SUCCESS',
    data
  }
}

export function create(id, page= '/marca') {
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPost(page, id)
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