/*
*   登录模块的store
*
*/

import { login } from '@/api/login'
import router from '@/router'

const state = {
  // 控制导航菜单是否收起
  isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false
}

const mutations = {
  setCollapse (state) {
    state.isCollapse = !state.isCollapse
    // 将state的isCollapse存储在本地
    localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    // 数据存储的另外一种 cookie_js
  }
}

const actions = {
  Login (content, requestData) {
    return new Promise((resolve, reject) => {
      // 调用封装好的接口
      login(requestData).then(response => {
        console.log(response.data)
        console.log(this)
        router.push({
          name: 'Console'
        })
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

const app = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default app
