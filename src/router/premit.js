// 路由守卫
import router from '@/router/index'
import { getToken } from '@/utils/app'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 从cookie中判断是否存在token 存在就跳转控制台页面
    next()
  } else {
    // token不存在或者过期
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
