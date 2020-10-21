import { httpPost } from '../../utils'

export function error(error) {
  return {
    type: 'FOTO_PERFIL_EDIT_ERROR',
    error
  }
}

export function loading(loading) {
  return {
    type : 'FOTO_PERFIL_EDIT_LOADING',
    loading
  }
}

export function success(data) {
  return {
    type: 'FOTO_PERFIL_EDIT_SUCCESS',
    data
  }
}

export function edit(obj,page='/usuario-img-perfil'){
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPost(page,obj)
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