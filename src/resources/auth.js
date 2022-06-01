import store from "../store";

export function AuthRequired(to, from, next) {
  if (store.getters["auth/loggedIn"]) {
      next();
      return;
  }
  next("/login");
}

export function NonAuthRequired(to, from, next) {
  if (!store.getters["auth/loggedIn"]) {
      next();
      return;
  }
  next("/");
}