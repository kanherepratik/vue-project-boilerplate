<template>
  <div>
    <input type="text" v-model="task" />
    <button @click="onAddTodo()">Add Task</button>
    <div>
      <p>Todo List</p>
      <div v-for="(todo, index) in todoList" :key="index">
        {{ todo }}
      </div>
      <portal v-if="showModal" to="destination">
        <div class="overlay">
          <div class="modal">
            <h1>
              Are you sure you want to remove this phone from your list?
            </h1>
            <div>
              <button type="button" @click="closeModal">
                Cancel
              </button>
              <button type="button">
                Remove
              </button>
            </div>
          </div>
        </div>
      </portal>
    </div>
  </div>
</template>

<script lang="ts">
import mixins from '@/mixins/mixinHelper';
import todoMixin from '@/mixins/todoMixin';
import { Portal } from 'portal-vue';

// local interface for data object
interface IData {
  task: string;
  showModal: boolean,
}

export default mixins(todoMixin).extend({
  name: 'TodoComponent',
  components: {
    'portal': Portal,
  },
  data: (): IData => ({
    task: '',
    showModal: false,
  }),
  computed: {
    todoList: {
      get(): string[] {
        return this.$store.gettersHelper.addTodo;
      },
    },
  },
  methods: {
    toggleModal(): void {
      this.showModal = !this.showModal;
    },
    closeModal(): void {
      this.toggleModal();
    },
    onAddTodo(): void {
      this.toggleModal();
      this.mixinOutput(this.task);
      this.$store.actionsHelper.addTodo(this.task);
    },
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  background: rgba(0, 0, 0, 0.75);
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #fff;
  width: 400px;
  height: 200px;
}
</style>
