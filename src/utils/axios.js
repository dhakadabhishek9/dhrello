import axios from 'axios'

const axiosInstance = axios.create()

export const setupInterceptors = () => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response.status === 403) {
        // Logout functionality
      }

      return Promise.reject(error)
    }
  )
}

const METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
}

const makeRequest = async (url, method, data = {}, params = {}) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  return axiosInstance({
    url,
    method,
    data,
    headers,
    params
  })
}

const getRequest = (url, params) => makeRequest(url, METHODS.get, {}, params)

const postRequest = (url, data) => makeRequest(url, METHODS.post, data)

const putRequest = (url, data) => makeRequest(url, METHODS.put, data)

const deleteRequest = (url, data) => makeRequest(url, METHODS.delete, data)

export { getRequest, postRequest, putRequest, deleteRequest }
