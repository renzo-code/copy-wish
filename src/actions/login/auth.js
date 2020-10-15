import { httpPost } from '../../utils/index'

export function error(error) {
  return {
    type: 'LOGIN_POST_ERROR',
    error,
  }
}

export function loading(loading) {
  return {
    type: 'LOGIN_POST_LOADING',
    loading
  }
}

export function success(data) {
  console.log('success', data)
  return {
    type: 'LOGIN_POST_SUCCESS',
    data
  }
}

export function auth(obj, page ='/login') {
  return(dispatch) => {
    dispatch(loading(true))
    dispatch(error(null))

    httpPost(page, obj)
    .then((data)=>{
      localStorage.setItem('jwt', JSON.stringify(data))
      dispatch(loading(false))
      dispatch(success(data.reply))
    })
    .catch((e)=> {
      dispatch(loading(false))
      dispatch(error(e))
    })
  }
}
