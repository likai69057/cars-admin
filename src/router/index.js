import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录主页
  {
    path: '/',
    redirect: 'login',
    meta: { name: '主页' },
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: { name: '登录页' },
    hidden: true
  },
  // 控制台
  {
    path: '/console',
    name: 'Console',
    redirect: '/index',
    component: () => import('@/views/layout/index'),
    meta: {
      name: '控制台',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/console/index'),
        meta: { name: '首页' }
      }
    ]
  },
  // 信息管理
  {
    path: '/info',
    name: 'Info',
    component: () => import('@/views/layout/index'),
    meta: {
      name: '信息管理',
      icon: 'el-icon-help'
    },
    children: [
      {
        path: '/infoIndex',
        name: 'InfoIndex',
        component: () => import('@/views/News/index'),
        meta: { name: '信息列表' }
      },
      {
        path: '/infoCategory',
        name: 'InfoCategory',
        component: () => import('@/views/News/category'),
        meta: { name: '信息分类' }
      }
    ]
  },
  // 用户管理
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/layout/index'),
    meta: {
      name: '用户管理',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: '/userIndex',
        name: 'UserIndex',
        component: () => import('@/views/user/index'),
        meta: { name: '用户列表' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
