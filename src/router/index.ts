import Vue from 'vue';
import Router from 'vue-router';
import FormIndex from '@/FormBuilder/FormIndex.vue';
import { ROUTES } from '@/router/constants';
import { lazyLoad } from './utils';
import configureRouteGuard from './config';

Vue.use(Router);
const router: Router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_ROUTE,
  routes: [
    {
      path: '/',
      component: lazyLoad(ROUTES.HOME.componentName as string, ROUTES.HOME.componentPath, ROUTES.HOME.hasMobileVersion),
    },
    {
      path: '/proposal',
      component: FormIndex,
    },
    {
      path: '**',
      redirect: '/',
    },
  ],
});

configureRouteGuard(router);

export default router;
