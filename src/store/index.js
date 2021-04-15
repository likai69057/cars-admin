import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/modules/app.js'
import login from '@/store/modules/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 针对不同组件的模块化vuex
  modules: {
    app,
    login
  }
})
