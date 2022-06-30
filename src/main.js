import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import authModule from './modules/auth';
import propertyModule from './modules/property';
import renterProfileModule from './modules/renterProfile';
import rentModule from './modules/rent';

import { registerModules } from './register-modules';

registerModules({
  auth: authModule,
  property: propertyModule,
  renterProfile: renterProfileModule,
  rent: rentModule,
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
