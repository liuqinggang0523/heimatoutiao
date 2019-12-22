import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadcrumb from './common/bread-crumb.vue'
export default {
  install (Vue) {
    // 注册全局组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadcrumb)
  }
}
