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
import Vue from 'vue';

interface IData {
    task: string;
}

export default Vue.extend({
    name: 'TodoComponent',
    data: (): IData => ({
        task: ''
    }),
    computed: {
        todoList: {
            get(): string[] {
                return this.$store.gettersHelper.addTodo;
            }
        }
    },
    methods: {
        onAddTodo(): void {
            this.$store.actionsHelper.addTodo(this.task);
        }
    }
});
</script>
