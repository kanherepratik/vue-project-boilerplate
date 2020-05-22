import Vue from 'vue';
import Router from 'vue-router';
import FormIndex from '@/FormBuilder/FormIndex.vue'
import { lazyLoad } from './utils';
import configureRouteGuard from './config';

Vue.use(Router);
// Vue.component('FormIndex', FormIndex)
const router: Router = new Router({
    mode: 'history',
    base: process.env.VUE_APP_BASE_ROUTE,
    routes: [
        {
            path: '/',
            component: lazyLoad('home', '/HOME', false)
        },
        {
            path: '/proposal',
            component: FormIndex
        },
        {
            path: '**',
            redirect: '/'
        }
    ]
});

configureRouteGuard(router);

export default router;
