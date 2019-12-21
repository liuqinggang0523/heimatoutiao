import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Homepage from '../views/home/home.vue'

Vue.use(VueRouter)

const routes = [{ path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    childen: [{
      path: '', // 二级路由地址什么都不写，代表默认跳转
      component: Homepage
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
