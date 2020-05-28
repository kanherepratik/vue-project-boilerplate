<template>
  <div class="home">
    <todo-component />
    <checkbox-group
      :chechboxItems="[
        {
          value: 'Apple',
          disabled: false,
          checked: false,
          label: 'Apple',
        },
        {
          value: 'Banana',
          disabled: false,
          checked: false,
          label: 'Banana',
        },
        {
          value: 'Grapes',
          disabled: false,
          checked: false,
          label: 'Grapes',
        },
        {
          value: 'Orange',
          disabled: true,
          checked: false,
          label: 'Orange',
        },
      ]"
      align="horizontal"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import CheckboxGroup from '@/common/components/CheckboxGroup.vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'checkbox-group': CheckboxGroup,
  },
  computed: {},
  methods: {},
});
</script>
