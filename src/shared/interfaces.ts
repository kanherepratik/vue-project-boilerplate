// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRoot {
    version: string;
}

export interface ITodoState {
    todoList: string[];
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
