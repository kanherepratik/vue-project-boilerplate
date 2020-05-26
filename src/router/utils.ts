/* eslint-disable @typescript-eslint/no-explicit-any */
import { IS_MOBILE_DEVICE } from '@/shared/constants';
/**
 * Returns component view of view name passed
 * @param view View's string vue file name
 * @param path Folder path from views folder
 */
export const lazyLoad = (view: string, path = '', hasMobileVersion = false): any => {
  let sanitizedPath = path;
  if (!sanitizedPath) {
    sanitizedPath = '';
  }
  if (sanitizedPath !== '' && !sanitizedPath.endsWith('/')) {
    sanitizedPath += '/';
  }
  return (): any =>
    IS_MOBILE_DEVICE && hasMobileVersion
      ? import(/* webpackChunkName: "view-mobile-[request]" */ `@/views/${path}mobile/${view}Mobile.vue`)
      : import(/* webpackChunkName: "view-[request]" */ `@/views/${path}${view}.vue`);
};

/**
 * Scrolls page to view for qf2 pages
 */
export const scrollToTop = (): void => {
  window.scrollTo(0, 50);
};
