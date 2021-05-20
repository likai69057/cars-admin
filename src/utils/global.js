// 封装好的弹窗API 注册全局原型方法

import { MessageBox } from 'element-ui'
export default {
  install (Vue, options) {
    Vue.prototype.confirm = (params) => {
      MessageBox.confirm(params.content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: params.type || 'warning',
        center: true
      }).then(() => {
        if (params.func) {
          params.func(params.id || '')
        }
      }).catch(() => {
        if (params.catchFn) {
          params.catchFn(params.id || '')
        }
      })
    }
  }
}
