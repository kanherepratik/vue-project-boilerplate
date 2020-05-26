<template>
  <div class="home">
    <todo-component />
    <app-checkbox />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue';
import TodoComponent from '@/components/TodoComponent.vue';
import AppCheckbox from '@/common/components/AppCheckbox.vue';

interface IData {} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'app-checkbox': AppCheckbox,
  },
  computed: {},
  methods: {},
});
</script>
