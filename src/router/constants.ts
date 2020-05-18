import { IAllRoutes } from '@/router/interfaces';

// component name is the .vue file name
// component path is the path of the component after src/views/
export const ROUTES: IAllRoutes = {
  HOME: {
    path: '/',
    name: 'home',
    componentName: 'Home',
    componentPath: 'Home/',
    hasMobileVersion: false,
  },
};
