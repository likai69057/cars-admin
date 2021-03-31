import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/main.less'
// 引入Element组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vue3.0新特性语法composition API
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
