export const timestampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000)
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
}
