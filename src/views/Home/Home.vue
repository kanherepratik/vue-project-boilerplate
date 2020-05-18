<template>
  <div class="home">
    <todo-component />
    <radio-component
      v-for="(item, index) in items"
      v-model="radioActive"
      :key="index"
      :value="item.value"
      :label="item.label"
    />
    <p>Active Value: {{ radioActive }}</p>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import RadioComponent from '@/components/RadioButton.vue';
import Vue from 'vue';

interface IData {} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'radio-component': RadioComponent,
  },
  data: () => ({
    radioActive: '',
    items: [
      {
        value: '1',
        label: 'one',
      },
      {
        value: '2',
        label: 'Two',
      },
      {
        value: '3',
        label: 'Three',
      },
    ],
  }),
  computed: {},
  methods: {},
});
</script>
