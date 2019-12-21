import router from '../router'
import { Message } from 'element-ui'
// 封装一个axios拦截器
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 设置公共路径
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发起请求做一些业务处理,config是发送请求的配置信息
  let token = window.localStorage.getItem('token')
  // 因为所有的token信息格式是一致的,所以给headers设置统一的属性token
  config.headers.Authorization = `Bearer ${token}`
  return config // 此后用该config进行操作
}, function () {
  // return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行该函数
  return response.data ? response.data : {}
}, function (error) {
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401: // token过期或者失效
      window.localStorage.removeItem('token')
      router.push('/login')
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})
export default axios
