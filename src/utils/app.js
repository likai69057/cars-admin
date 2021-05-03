import cookie from 'cookie_js'

// 从本地cookie中获取存储的token值
export function getToken () {
  return cookie.get('admin_token')
}

// 从本地cookie中设置存储的token值
export function setToken (value) {
  return cookie.set('admin_token', value)
}

// 删除token数据
export function removeToken () {
  return cookie.remove('admin_token')
}

// 从本地cookie中获取存储的username
export function getUserName () {
  return cookie.get('username')
}

// 从本地cookie中设置存储的username
export function setUserName (value) {
  return cookie.set('username', value)
}

// 删除username数据
export function removeUsername () {
  return cookie.remove('username')
}
