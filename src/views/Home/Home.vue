<template>
  <div class="home">
    <todo-component />
    <i18-component />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import I18Component from '@/components/I18Component.vue';

interface IData {} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'i18-component': I18Component,
  },
});
</script>
