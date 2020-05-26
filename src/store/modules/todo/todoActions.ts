import { ActionContext, ActionTree } from 'vuex';
import { ITodoState, IRoot } from '@/store/interfaces';
import { TODO_STORE } from '@/store/constants';
import { classToStoreCoreObject } from '../../utils';

export class TodoActions {
  public addTodo(context: ActionContext<ITodoState, IRoot>, payload: string): void {
    context.commit(TODO_STORE.MUTATIONS.ADD_TODO, payload);
  }
}

export default classToStoreCoreObject<ITodoState, IRoot>(TodoActions) as ActionTree<ITodoState, IRoot>;
