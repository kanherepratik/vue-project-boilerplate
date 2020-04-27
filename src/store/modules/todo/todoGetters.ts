import { ITodoState, IRoot } from '@/shared/interfaces';
import { GetterTree } from 'vuex';
import { classToStoreCoreObject } from '../../utils';

export class TodoGetters {
    public addTodo(currentState: ITodoState): string[] {
        return currentState.todoList;
    }
}

export default classToStoreCoreObject<ITodoState, IRoot>(TodoGetters) as GetterTree<ITodoState, IRoot>;

// const getters: GetterTree<ITodoState, IRoot> = {
//     todoList(currentState: ITodoState): string[] {
//         return currentState.todoList;
//     }
// };

// export default getters;
