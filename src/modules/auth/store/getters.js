export default {
  user: state => state.user,
  token: state => state.token,
  loggedIn: state => state.token ? true : false,
}