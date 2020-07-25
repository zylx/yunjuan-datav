import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Echarts from 'echarts'
import ECharts from 'vue-echarts'
import '@/plugins/element.js'
import '@/plugins/vcharts.js'
import '@/style/index.css'

import services from '@/api/index'

Vue.config.productionTip = false
// Vue.prototype.$echarts = Echarts
Vue.component('v-chart', ECharts)

// 将services挂载到vue的原型上
// 业务中引用的方法：this.$services.接口名（小驼峰）
Vue.prototype.$services = services

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
