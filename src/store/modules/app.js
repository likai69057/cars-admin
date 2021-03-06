/*
*   登录模块的store
*
*/

import { login } from '@/api/login'
import { setToken, setUserName, getUserName } from '@/utils/app'
const state = {
  // 控制导航菜单是否收起
  isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
  token: '',
  username: getUserName('username') || ''
}

const mutations = {
  // 设置控制导航菜单是否收起
  setCollapse (state) {
    state.isCollapse = !state.isCollapse
    // 将state的isCollapse存储在本地
    localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  },
  // 设置cookie存储token
  SET_TOKEN (state, value) {
    state.token = value
    // 存储到cookie
    setToken(value)
  },
  // 设置cookie存储username
  SET_USERNAME (state, value) {
    state.username = value
    setUserName(value)
  },
  // 清除state的token和username
  REMOVE_TOKEN (state) {
    state.token = ''
    state.username = ''
  }
}

const actions = {
  Login (content, requestData) {
    return new Promise((resolve, reject) => {
      // 调用封装好的接口
      login(requestData).then(response => {
        const data = response.data.data
        // 接口调用成功后将返回的数据存储到本地cookie
        content.commit('SET_TOKEN', data.token)
        content.commit('SET_USERNAME', data.username)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  Logout () {
    return new Promise((resolve, reject) => {
      resolve()
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
