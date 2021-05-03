// 路由守卫
import router from '@/router/index'
import { getToken, removeToken, removeUsername } from '@/utils/app'
import store from '../store'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 从cookie中判断是否存在token 存在就跳转控制台页面
    if (to.path === '/login') {
      next()
      // 判断用户是否需要退出 若退出 则清除cookie和state的token、username
      removeToken('admin_token')
      removeUsername('username')
      store.commit('app/REMOVE_TOKEN')
    } else {
      next()
    }
  } else {
    // token不存在或者过期
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
