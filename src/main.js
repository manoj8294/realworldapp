import Vue from "vue";
import App from "./App.vue";
import router from ".";
import store from "./store";
import "./assets/main.css";
import "./registerServiceWorker";

import { isAuthenticate } from "./store/actions.type";
import ApiService from "./common/api.service";
import DateFilter from "./common/date.filter";
import ErrorFilter from "./common/error.filter";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();

// Ensure we checked auth before each page load.
router.beforeEach((to, from, next) =>
  Promise.all([store.dispatch(isAuthenticate)]).then(next)
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
