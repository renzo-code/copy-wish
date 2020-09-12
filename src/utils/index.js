import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:7000/q8sgi24cc3.execute-api/pe-south-1/v1'
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`;

export const httpGet = async (page, params) => {
  const service = params ? `${page}/${params}` : page
  // console.log('http get', page)
  try {
    if (page === '/login') {
      const response = await axios.get(service)

      return response.data
    } else {
      const response = await axios.get(service, {
        headers : {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`,
        }
      })

      return response.data
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const httpPost = async (page, params) => {
  try {
    if (page === '/user') {
    const response = await axios.post(page, params)

    return response.data
  } else {
    const response = await axios.post(page, params, {
      headers : {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
      }
    })

    return response.data
  }
  } catch (error) {
    throw new Error(error)
  }
}

export const httpPut = async (page, params) => {
  try {
    const response = await axios.put(page, params, {
      headers : {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

export const httpDelete = async (page, params) => {
  try {
    const response = await axios.delete(page, params, {
      headers : {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`,
      }
    })

    return response.data
  } catch (error) {
    throw new Error(error)
  }
}