<template>
  <div class="home">
    <!-- <todo-component />
    <app-checkbox /> -->
    <form-index />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import TodoComponent from '@/components/TodoComponent.vue';
// import AppCheckbox from '@/common/components/AppCheckbox.vue';
import FormIndex from '../../FormBuilder/FormIndex.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    // 'todo-component': TodoComponent,
    // 'app-checkbox': AppCheckbox,
    'form-index': FormIndex,
  },
  computed: {},
  methods: {},
});
</script>
