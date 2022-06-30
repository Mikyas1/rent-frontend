// const Module = () => import('./Module.vue');
const RentList = () => import('./views/PropertyList.vue');
const MyProperties = () => import('./views/MyProperties.vue');
const PropertyDetail = () => import('./views/PropertyDetail.vue');

// import { NonAuthRequired } from '@/resources/auth';

const moduleRoute = {
  path: '/',
    //   component: Module,
    component: () => import("../../components/layout/Layout.vue"),
  // beforeEnter:(to, from, next) => {},
  // a general navigation gard for the entire module
  children: [
    {
      path: '/',
      name: 'property_list',
      component: RentList,
      // beforeEnter: NonAuthRequired,
    },
    {
      path: 'my-properties',
      name: 'my_properties',
      component: MyProperties,
      // beforeEnter: NonAuthRequired,
    },
    {
      path: 'property/:id',
      name: 'property_detail',
      component: PropertyDetail,
    },
  ],
};

export default router => {
  router.addRoute(moduleRoute); // for single route registration
};
