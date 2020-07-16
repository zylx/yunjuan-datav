import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/element.js'
// import Echarts from 'echarts'
import ECharts from 'vue-echarts'
import '@/style/index.css'

Vue.config.productionTip = false
// Vue.prototype.$echarts = Echarts
Vue.component('v-chart', ECharts)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
