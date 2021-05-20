export const timestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  let D = date.getDate()
  if (D < 10) {
    D = '0' + D
  }
  let h = date.getHours()
  if (h < 10) {
    h = '0' + h
  }
  let m = date.getMinutes()
  if (m < 10) {
    m = '0' + m
  }
  let s = date.getSeconds()
  if (s < 10) {
    s = '0' + s
  }
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
