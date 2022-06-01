// import * as types from "./mutation-types";

export default {
  login: ({commit}, data) => {
    commit("SET_TOKEN", data.token);
    commit("SET_USER", data.user);
  },

  logout: ({commit}) => {
    commit("RESET");
  },

  update_user: ({commit}, data) => {
    commit("UPDATE_USER",   data)
  }
}