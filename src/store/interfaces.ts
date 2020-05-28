export interface IRoot {
  version: string;
}

export interface ITodoState {
  todoList: string[];
}

export interface ITodo {
  task: string;
}

export interface IToast {
  text: string;
  duration?: number;
}

export interface IToastState {
  toast: IToast;
}
