import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "@/i18n/index";
import Antd from 'ant-design-vue'

import "@/assets/style/reset.scss";
import "@/assets/style/common.scss";
import "@/assets/style/flex.scss";
import "@/assets/style/index.scss";
import "ant-design-vue/dist/antd.css";

Vue.use(Antd)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
