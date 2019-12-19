import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 引入ElementUI
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'// 引入初始化样式
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
