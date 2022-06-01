const Module = () => import('./Module.vue');
const Login = () => import('./views/Login.vue');
const Logout = () => import('./views/Logout.vue');

import { AuthRequired, NonAuthRequired } from '@/resources/auth';

const moduleRoute = {
  path: '/auth',
  component: Module,
  // beforeEnter:(to, from, next) => {},
  // a general navigation gard for the entire module
  children: [
    {
      path: 'login',
      name: 'login',
      component: Login,
      beforeEnter: NonAuthRequired,
    },
    {
      path: 'logout',
      name: 'logout',
      component: Logout,
      beforeEnter: AuthRequired,
  },
  ],
};

export default router => {
  router.addRoute(moduleRoute); // for single route registration
};
