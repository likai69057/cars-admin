import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/main.less'
// 引入Element组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义的路由守卫
import './router/premit'

// 引入自定义的全局方法
import global from '@/utils/global'

// 引入vue3.0新特性语法composition API
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)

Vue.use(global)

// 引入自定义的全局组件 (由于vue默认是runtime模式 无法编译template 需在main.js文件重定向vue模式)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
