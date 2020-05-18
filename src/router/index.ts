import Vue from 'vue';
import Router from 'vue-router';
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
      path: '**',
      redirect: '/',
    },
  ],
});

configureRouteGuard(router);

export default router;
