// 处理路由器拦截 导航守卫
import router from '../router'
import progress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
// 全局前置守卫,当路由发生变化时,这个方法的回调函数就会执行
router.beforeEach(function (to, from, next) {
  progress.start()
  // 参数to表示即将要去的路由,此时判断有无token令牌,有直接跳过,没有则返回主页
  // to.path表示地址,然后判断是否以 /home开头
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  progress.done()
})
