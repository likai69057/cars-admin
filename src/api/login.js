// 登录模块接口
import serve from '@/utils/request'
// 1.获取验证码
export const getSms = function (data) {
  return serve.request({
    method: 'POST',
    url: '/getSms/',
    data
  })
}

// 2.获取用户角色
// 3.登录
export const login = function (data) {
  return serve.request({
    method: 'POST',
    url: '/login/',
    data
  })
}
// 4. 注册
export const register = function (data) {
  return serve.request({
    method: 'POST',
    url: '/register/',
    data
  })
}
