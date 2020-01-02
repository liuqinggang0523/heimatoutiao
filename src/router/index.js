import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Homepage from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [{ path: '/', redirect: '/home' },
  {
    path: '*',
    component: () => import('../views/404/404.vue')
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '', // 二级路由地址什么都不写，代表默认跳转
      component: Homepage
    }, {
      path: '/home/comment', // 评论列表
      component: () => import('../views/comment')
    }, {
      path: '/home/material', // 素材管理
      component: () => import('../views/imgPage')
    }, {
      path: '/home/articles', // 文章列表
      component: () => import('../views/article')
    }, {
      path: '/home/publish', // 发表文章
      component: () => import('../views/publishArticle')
    }, {
      path: '/home/publish/:articleId', // 修改文章，动态路由传id
      component: () => import('../views/publishArticle')
    }, {
      path: '/home/userInfo', // 个人账户信息
      component: () => import('../views/userInfo')
    }]
  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
