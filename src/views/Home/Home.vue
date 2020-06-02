<template>
  <div class="home">
    <todo-component />
    <app-checkbox
      @onChange="handleCheckboxChange"
      header="Terms and Conditions"
      :options="options"
      v-model="selectedItems"
      :validations="validations"
      ref="checkboxRef"
    />
    <button @click="handleSubmit">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import AppCheckbox from '@/common/components/AppCheckbox.vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {
  options: any[];
  selectedItems: object;
  validations?: any[];
} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    'todo-component': TodoComponent,
    'app-checkbox': AppCheckbox,
  },
  data: (): IData => ({
    selectedItems: { tnc: false, 2: true },
    validations: [{ name: 'required', message: 'I am super important' }],
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
    handleSubmit(): void {
      (this.$refs.checkboxRef as any).isValid();
    },
    handleCheckboxChange(value: string): string {
      console.log(this.selectedItems);
      return value;
    },
  },
});
</script>
