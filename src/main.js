import Vue from 'vue'
import App from './App.vue'
import './permission' // 引入token令牌权限模块
import router from './router'
import Component from './components/index'
import ElementUI from 'element-ui'// 引入ElementUI
import axios from './utils/request.js'// 引入axios
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'// 引入初始化样式
Vue.prototype.$axios = axios // axios赋值给全局属性
Vue.use(ElementUI)
Vue.use(Component)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
