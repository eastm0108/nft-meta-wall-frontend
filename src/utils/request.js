import axios from 'axios';
import store from '@/store';
import { getLocalStorageToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    
    if (store.getters['user/token']) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer '+ getLocalStorageToken();
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    const status = response.status;

    // if the custom code is not 200, it is judged as an error.
    if (status !== 200) {
      // do something

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (status === 50008 || status === 50012 || status === 50014) {
        // do something
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // do something
    return Promise.reject(error)
  }
)

export default service;