import App from './App'
import './static/iconfont/iconfont.css'
import './static/global.css'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
import * as filters from "./filter"
Object.keys(filters).forEach((k) => {
  Vue.filter(k, filters[k])
}) //注册过滤器
Vue.prototype.formatTime = filters.formatTime