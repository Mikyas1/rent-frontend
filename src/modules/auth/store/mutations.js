// import * as types from "./mutation-types";

export default {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  RESET: state => {
    state.token = null;
    state.user = null;
  },
  UPDATE_USER: (state, data) => {
    if (state.user) {
      state.user.phone_no = data.phone_no;
      state.user.first_name = data.first_name;
      state.user.last_name = data.last_name;
      state.user.email = data.email;
    }
  }
};