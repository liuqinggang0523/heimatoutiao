import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadcrumb from './common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor' // 富文本编辑器
import coverImg from '../../public/cover-img/coverImg.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    // 注册全局组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadcrumb) // 全局面包屑
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImg) // 封面组件
  }
}
