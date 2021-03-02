// 验证邮箱用户名
export function validateUser (value) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return !reg.test(value)
}

// 验证密码
export function validatepass (value) {
  const reg = /^[A-Za-z0-9]{6,20}$/
  return !reg.test(value)
}
