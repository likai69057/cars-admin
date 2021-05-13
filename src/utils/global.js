// 封装好的弹窗API 注册全局原型方法

import { MessageBox, Message } from 'element-ui'
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
          params.func()
        }
        Message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
