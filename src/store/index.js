import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

import {store} from "../modules/auth";

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'rent',
  storage: window.localStorage,
  reducer: (state) => ({auth: state.auth,})
})

export default new Vuex.Store({
  modules: {
    auth: store,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
  plugins: [
    vuexLocalStorage.plugin,
  ]
})
