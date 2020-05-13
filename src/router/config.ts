import Router, { Route } from 'vue-router';
import { scrollToTop } from './utils';
import { loadLanguageAsync } from '../i18n';

/**
 * configures route guard for each route
 * @param router Vue Router object
 */
const configureRouteGuard = (router: Router): void => {
  router.beforeEach((to: Route, from: Route, next: () => void) => {
    const { lang } = to.params;
    loadLanguageAsync(lang).then(() => next());
    scrollToTop();
    next();
  });
  // router.afterEach((to: Route, from: Route) => {});
};

export default configureRouteGuard;
