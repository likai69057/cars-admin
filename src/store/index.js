import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 控制导航菜单是否收起
    isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false
    // isCollapse: Cookie.get('isCollapse') || false
  },
  mutations: {
    setCollapse (state) {
      state.isCollapse = !state.isCollapse
      // 将state的isCollapse存储在本地
      localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
      // 数据存储的另外一种 cookie_js
    }
  },
  actions: {
    setMenuStatus (content, data) {
    }
  },
  modules: {
  }
})
