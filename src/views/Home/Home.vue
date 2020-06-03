<template>
  <div class="home">
    <!-- <todo-component />
    <app-checkbox /> -->
    <form-index @onBlur="handleBlur" @onChange="handleChange" ref="formRef" />
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleChange(fieldId: string, value: any): void {
      switch (fieldId) {
        case 'tnc': {
          // eslint-disable-next-line no-unused-expressions
          console.log((this.$refs.formRef as any).getFieldRef('panCard').disableField());
          // this.bus.$emit('disableField', 'panCard');
          break;
        }
        default:
      }
    },

    handleBlur(fieldId: string, value: any): void {
      console.log('container', fieldId, value);
    },

    handleCheckboxChange(value: string): string {
      console.log(this.selectedItems);
      return value;
    },
  },
});
</script>
