// 路由守卫
import router from '@/router/index'
import { getToken } from '@/utils/app'

router.beforeEach((to, from, next) => {
  if (getToken()) {
    console.log('token存在')
  } else {
    // token不存在或者过期
    next()
  }
})
