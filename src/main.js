import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VCalendar from "./plugins/VCalendar";
import VueAnimateOnScroll from "./plugins/AnimateOnScroll";
import "@/plugins/firebase";
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VCalendar,
  VueAnimateOnScroll,
  render: (h) => h(App),
}).$mount("#app");
