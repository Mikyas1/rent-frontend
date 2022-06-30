// const Module = () => import('./Module.vue');
const RentRequestesSent = () => import('./views/RentRequestsSent.vue');
const RentRequestsRecived = () => import('./views/RentRequestsRecived.vue');
const RentRequestDetail = () => import('./views/RentRequestDetail.vue');
const MyRents = () => import('./views/MyRents.vue');
const MyRentedProperties = () => import('./views/MyRentedProperties.vue');
const RentDetail = () => import('./views/RentDetail.vue');
const Contract = () => import('./views/Contract.vue');

import { AuthRequired } from '@/resources/auth';

const moduleRoute = {
    path: '/',
    //   component: Module,
    component: () => import("../../components/layout/Layout.vue"),
    // beforeEnter:(to, from, next) => {},
    // a general navigation gard for the entire module
    children: [
        {
            path: 'my-rent-requests',
            name: 'my_rent_requests',
            component: RentRequestesSent,
            beforeEnter: AuthRequired,
        },
        {
            path: 'recived-rent-requests',
            name: 'recived_rent_requests',
            component: RentRequestsRecived,
            beforeEnter: AuthRequired,
        },
        {
            path: 'rent-requests-detail/:id',
            name: 'rent_requests_detail',
            component: RentRequestDetail,
            beforeEnter: AuthRequired,
        },
        {
            path: 'my-rents',
            name: 'my_rents',
            component: MyRents,
            beforeEnter: AuthRequired,
        },
        {
            path: 'my-rented-properties',
            name: 'my_rented_properties',
            component: MyRentedProperties,
            beforeEnter: AuthRequired,
        },
        {
            path: 'rent-detail/:id',
            name: 'rent_detail',
            component: RentDetail,
            beforeEnter: AuthRequired,
        },
    ],
};

const contractLink = {
    path: '/contract/:id',
    name: 'contract',
    component: Contract,
    beforeEnter: AuthRequired,
};

export default router => {
    router.addRoute(moduleRoute); // for single route registration
    router.addRoute(contractLink);
};
