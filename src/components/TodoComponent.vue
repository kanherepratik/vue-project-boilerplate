<template>
  <div>
    <input type="text" v-model="task" />
    <button @click="onAddTodo()">Add Task</button>
    <div>
      <p>Todo List</p>
      <div v-for="(todo, index) in todoList" :key="index">
        {{ todo }}
      </div>
      <button type="button" class="dialogButton abc" @click="openModal">
        Open Modal!
      </button>
      <app-dialog v-show="showModal" v-bind:showModal="showModal" @close="closeModal" :hideOverlay="true">
        <template v-slot:header>
          This is the default tile!
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close modal">x</button>
        </template>
        <template v-slot:body>
          I'm the default body!
        </template>
        <template v-slot:footer>
          I'm the default footer!
          <button type="button" class="btn-green" @click="closeModal" aria-label="Close modal">Close me!</button>
        </template>
      </app-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import mixins from '@/mixins/mixinHelper';
import todoMixin from '@/mixins/todoMixin';
import AppDialog from '@/components/AppDialog.vue';

// local interface for data object
interface IData {
  task: string;
  showModal: boolean,
}

export default mixins(todoMixin).extend({
  name: 'TodoComponent',
  components: {
    'app-dialog': AppDialog,
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
    openModal(): void {
      this.showModal = true;
    },
    closeModal(): void {
      this.showModal = false;
    },
    onAddTodo(): void {
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
