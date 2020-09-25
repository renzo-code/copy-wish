import { httpGet } from '../../utils/index'

export function error(error) {
  return {
    type: 'CATEGORIA_LIST_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type: 'CATEGORIA_LIST_LOADING',
    loading
  }
}

export function success(data) {
  return{
    type : 'CATEGORIA_LIST_SUCCESS',
    data
  }
}

export function list(obj,page = '/categoria') {
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpGet(page, obj)
    .then((data) => {
      dispatch(loading(false))
      dispatch(success(data.reply))
    })
    .catch((e)=> {
      dispatch(loading(false))
      dispatch(error(e))
    })
  }
}

