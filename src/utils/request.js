// 封装axios 拦截器
import axios from 'axios'
import { Message } from 'element-ui'

// 跨域处理
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi'
const serve = axios.create({
  baseURL: BASEURL,
  timeout: 15000
})

// 添加拦截器
serve.interceptors.request.use(config => {
  // 在发送请求之前做什么
  return config
}, error => {
  // 请求失败后该做什么
  return Promise.reject(error)
})

// 添加响应拦截器
serve.interceptors.response.use(response => {
  // 对响应数据做点什么
  // 1.请求验证码时 判断返回的resCode是否是0（后端验证 响应成功但是参数有误时）
  if (response.data.resCode !== 0) {
    Message.error(response.data.message)
    return Promise.reject(response.data)
  } else {
    return response
  }
}, error => {
  // 响应失败后该做什么
  return Promise.reject(error)
})

export default serve
