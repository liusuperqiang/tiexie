import Vue from 'vue'
import App from './App'
import config from './utils/config'
Vue.config.productionTip = false
App.mpType = 'app'

import httpRequest from "./utils/api"
Vue.prototype.$wxhttp = httpRequest

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = {
  url: config.URL,
  appId: 'wx2321f85bc3478c47',
  secret: 'fd9fa8cf956c8876c39e2b6786bcb220'
}
