import Router, { Route } from 'vue-router';
import { scrollToTop } from './utils';

/**
 * configures route guard for each route
 * @param router Vue Router object
 */
const configureRouteGuard = (router: Router): void => {
  router.beforeEach((to: Route, from: Route, next: () => void) => {
    scrollToTop();
    next();
  });
  // router.afterEach((to: Route, from: Route) => {});
};

export default configureRouteGuard;
