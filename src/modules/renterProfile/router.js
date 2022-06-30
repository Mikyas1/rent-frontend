// const Module = () => import('./Module.vue');
const RenterProfile = () => import('./views/RenterProfile.vue');

// import { NonAuthRequired } from '@/resources/auth';

const moduleRoute = {
  path: '/',
    //   component: Module,
    component: () => import("../../components/layout/Layout.vue"),
  // beforeEnter:(to, from, next) => {},
  // a general navigation gard for the entire module
  children: [
    {
      path: '/renter-profile',
      name: 'renter_profile',
      component: RenterProfile,
      // beforeEnter: NonAuthRequired,
    },
  ],
};

export default router => {
  router.addRoute(moduleRoute); // for single route registration
};
