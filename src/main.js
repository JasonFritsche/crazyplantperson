import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VCalendar from "./plugins/VCalendar";
import "@/plugins/firebase";
import "./registerServiceWorker";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
};

Vue.use(Toast, options);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  VCalendar,
  render: (h) => h(App),
}).$mount("#app");
