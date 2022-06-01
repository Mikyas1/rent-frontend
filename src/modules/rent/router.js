// const Module = () => import('./Module.vue');
const RentList = () => import('./views/RentList.vue');

import { NonAuthRequired } from '@/resources/auth';

const moduleRoute = {
  path: '/',
    //   component: Module,
    component: () => import("../../components/layout/Layout.vue"),
  // beforeEnter:(to, from, next) => {},
  // a general navigation gard for the entire module
  children: [
    {
      path: '/',
      name: 'rent_list',
      component: RentList,
      beforeEnter: NonAuthRequired,
    },
  ],
};

export default router => {
  router.addRoute(moduleRoute); // for single route registration
};
