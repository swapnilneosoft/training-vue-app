import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

require('@/store/subscriber');
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
store.dispatch('attempt', localStorage.getItem('token'))

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
