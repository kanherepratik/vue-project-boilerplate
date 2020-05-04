<template>
    <div>
        <input type="text" v-model="task" />
        <app-button color="red" @click="onAddTodo()">Add Task</app-button>
        <div>
            <p>Todo List</p>
            <div v-for="(todo, index) in todoList" :key="index">
                {{ todo }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import mixins from '@/mixins/mixinHelper';
import todoMixin from '@/mixins/todoMixin';
import AppButton from '@/components/AppButton.vue';

// local interface for data object
interface IData {
    task: string;
}

export default mixins(todoMixin).extend({
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
            this.mixinOutput(this.task);
            this.$store.actionsHelper.addTodo(this.task);
        }
    },
    components: {
        'app-button': AppButton
    }
});
</script>
