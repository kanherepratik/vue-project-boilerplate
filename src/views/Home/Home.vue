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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {
  options: any[];
  selectedItems: any[];
  validations?: any[];
} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    // 'todo-component': TodoComponent,
    // 'app-checkbox': AppCheckbox,
    'form-index': FormIndex,
  },
  data: (): IData => ({
    selectedItems: [],
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
