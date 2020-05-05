import { MutationTree } from 'vuex';
import { ITodoState } from '@/store/interfaces';
import { TODO_STORE } from '@/store/constants';

const mutations: MutationTree<ITodoState> = {
  [TODO_STORE.MUTATIONS.ADD_TODO]: (currentState: ITodoState, payload: string): void => {
    currentState.todoList.push(payload);
  },
};

export default mutations;
