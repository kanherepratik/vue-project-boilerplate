<template>
    <div>
        <input type="text" v-model="task" />
        <button @click="onAddTodo()">Add Task</button>

        <div>
            <p>Todo List</p>
            <div v-for="(todo, index) in todoList" :key="index">
                {{ todo }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import todo from '@/store/modules/todo';

@Component
export default class TodoComponent extends Vue {
    private task = '';

    private get todoList(): string[] {
        return todo.getTodoList;
    }

    private onAddTodo(): void {
        console.log('clicked');
        todo.addTodo(this.task);
    }
}
</script>
