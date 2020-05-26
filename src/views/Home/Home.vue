<template>
  <div class="home">
    <todo-component />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import Vue from 'vue';

interface IData {} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
  },
  data: (): IData => ({}),
  computed: {},
  methods: {},
});
</script>
