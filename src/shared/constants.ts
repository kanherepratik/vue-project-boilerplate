// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IS_MOBILE_DEVICE: boolean = (window as any).IS_MOBILE || false;

export const TODO_STORE = {
  MUTATIONS: {
    ADD_TODO: 'addTodo',
  },
};
