<template>
  <div class="home">
    <todo-component />
    <app-checkbox @onChange="handleCheckboxChange" header="Terms and Conditions" :options="options" />
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
import AppCheckbox from '@/common/components/AppCheckbox.vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {
  options: any[];
} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'checkbox-group': CheckboxGroup,
    'app-checkbox': AppCheckbox,
  },
  data: (): IData => ({
    options: [
      {
        value: 'tnc',
        label: 'I accept terms and conditions.',
      },
      {
        value: 2,
        label: '2',
      },
    ],
  }),
  computed: {},
  methods: {
    handleCheckboxChange(value: string): void {
      console.log(value);
    },
  },
});
</script>
