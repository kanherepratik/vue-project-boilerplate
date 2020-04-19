export interface ITodoState {
    task: string;
}

export interface ITodo {
    task: string;
}

export interface IRoute {
    path: string;
    name?: string;
    componentName?: string;
    componentPath?: string;
    hasMobileVersion?: boolean;
    redirectToName?: string;
}

// All Root Routes
export interface IAllRoutes {
    HOME: IRoute;
}
