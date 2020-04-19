import store from '@/store/';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';

@Module({
    dynamic: true,
    store,
    name: 'todoModule',
    namespaced: true
})
class Todo extends VuexModule {
    private todoList: string[] = [];

    @Mutation
    ADD_TODO(todo: string): void {
        this.todoList.push(todo);
    }

    @Action({ commit: 'ADD_TODO' })
    addTodo(todo: string): string {
        return todo;
    }

    get getTodoList(): string[] {
        return this.todoList;
    }
}
export default getModule(Todo);
