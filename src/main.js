import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import authModule from './modules/auth';
import rentModule from './modules/rent';

import { registerModules } from './register-modules';

registerModules({
  auth: authModule,
  rent: rentModule,
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
