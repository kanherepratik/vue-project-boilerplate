<template>
  <div class="home">
    <todo-component />
    <checkbox-component />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';
import TodoComponent from '@/components/TodoComponent.vue';
import CheckboxComponent from '@/components/CheckboxComponent.vue';

interface IData {} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'checkbox-component': CheckboxComponent,
  },
  data: (): IData => ({}),
  computed: {},
  methods: {},
});
</script>
