import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

import { store } from "../modules/auth";

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'rent',
  storage: window.localStorage,
  reducer: (state) => ({ auth: state.auth, })
})

export default new Vuex.Store({
  modules: {
    auth: store,
  },
  state: {
    snackbar: {
      message: '',
      value: false,
      status: '',
      timeout: 7000,
      multiline: false,
    }
  },
  getters: {
    snackbar: store => store.snackbar,
  },
  mutations: {
    SET_SNACKBAR: (store, payload) => {

      // CLOSE_SNACKBAR
      store.snackbar.value = false;
      store.snackbar.multiline = false;
      store.snackbar.timeout = 7000;
      store.snackbar.message = null;
      store.snackbar.status = null;

      store.snackbar.message = payload.message;
      store.snackbar.multiline = (payload.message.length > 50) ? true : false
      store.snackbar.value = payload.value;
      store.snackbar.status = payload.status;
      if (payload.timeout) {
        store.snackbar.timeout = payload.timeout;
      }
      if (payload.multiline) {
        store.snackbar.multiline = payload.multiline;
      }
    },
    CLOSE_SNCKBAR: (store) => {
      store.snackbar.value = false;
      store.snackbar.multiline = false;
      store.snackbar.timeout = 7000;
      store.snackbar.message = null;
      store.snackbar.status = null;
    }
  },
  actions: {
  },
  plugins: [
    vuexLocalStorage.plugin,
  ]
})
