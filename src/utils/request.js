import axios from 'axios'
import storage from '@/storage'
import router from '@/router'


// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  timeout: 5000 // request timeout
})


// 添加请求拦截器，若token存在则在请求头中加token，不存在也继续请求
service.interceptors.request.use(
  config => {
    // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器,没有则不带token
    // Authorization是必须的
    let tokenInfo = storage.get('TOKEN')
    const token = tokenInfo ? tokenInfo.accessToken : null
    const tokenType = token ? tokenInfo.tokenType.substring(0, 1).toUpperCase() + tokenInfo.tokenType.substring(1) + ' ' : null
    if (token && tokenType) {
      config.headers.Authorization = tokenType + token
    }
    return config
  },
  error => {
    console.log('在request拦截器检查到错误：', error.response)
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res=response.data;
    if (response.headers['content-type'] === "application/x-msdownload") {
      let disposition = decodeURI(response.headers['content-disposition']);
      let fileName = disposition.split('=')[1];
      const a = document.createElement('a')
      const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
      const url = URL.createObjectURL(blob)
      a.setAttribute('href', url)
      a.setAttribute('download', fileName)
      a.click()
      return
    }
  },
  error => {
    // 在status不正确的情况下，判别status状态码给出对应响应
    if (error.response) {
      console.log('在respone拦截器检查到错误：')
      switch (error.response.status) {
        case 204:
          error.response.data.error = '204:No Content（没有内容）'
          break
        case 401:
          // 可能是token过期，清除它
          storage.remove('tokenInfo')
          location.reload() // 刷新页面，触发路由守卫
          error.response.data.error = '401:Unauthorized（未经授权）'
          break
        case 403:
          error.response.data.error = '403:Forbidden（被禁止的）'
          break
        case 500:
          error.response.data.error = '500:服务器内部错误'
          break
        default:
          return error
      }
      return Promise.reject(error.response.data.error)
    }

    return Promise.reject(error)
  }
)

export default service
