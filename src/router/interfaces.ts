export interface IRoute {
  path: string;
  name?: string;
  componentName?: string;
  componentPath?: string;
  hasMobileVersion?: boolean;
  redirectToName?: string;
}

// All Root Routes
// ToDo: add proper iterface
export interface IAllRoutes {
  [keyof: string]: IRoute;
}
