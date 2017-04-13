// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    koms: [],
  },
  mutations: {
    saveKoms (state, koms) {
      state.koms = koms;
    }
  }
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
