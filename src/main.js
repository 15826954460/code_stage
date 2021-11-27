import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import VueApexCharts from 'vue-apexcharts'
import * as echarts from 'echarts';
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.prototype.$echarts = echarts

import "@/assets/style/reset.scss";
import "@/assets/style/common.scss";
import "@/assets/style/flex.scss";
import "ant-design-vue/dist/antd.css";
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
