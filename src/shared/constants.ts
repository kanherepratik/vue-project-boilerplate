/* eslint-disable import/prefer-default-export */
import { IAllRoutes } from '@/shared/interfaces';

// component name is the .vue file name
// component path is the path of the component after src/views/
export const ROUTES: IAllRoutes = {
    HOME: {
        path: '/',
        name: 'home',
        componentName: 'Home',
        componentPath: 'Home/',
        hasMobileVersion: false
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IS_MOBILE_DEVICE: boolean = (window as any).IS_MOBILE || false;

export const TODO_STORE = {
    MUTATIONS: {
        ADD_TODO: 'addTodo'
    }
};
