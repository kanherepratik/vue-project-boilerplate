<template>
  <div class="home">
    <!-- <todo-component />
    <app-checkbox />-->
    <form-index
      :formSchema="formSchema"
      :formData="formData"
      v-model="activeFormId"
      @stepClick="onStepClick($event)"
      @emit="handleEvent"
      ref="formRef"
    />
    <form-summary :formSchema="formSchema" :formData="formData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import TodoComponent from '@/components/TodoComponent.vue';
// import AppCheckbox from '@/common/components/AppCheckbox.vue';
import { get } from '@/services/api';
import { IStepClickEvent } from '@/FormBuilder/shared/interfaces';
import FormIndex from '../../FormBuilder/FormIndex.vue';
import FormSummary from '../../FormBuilder/FormSummary.vue';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {
  options?: any[];
  selectedItems?: any[];
  validations?: any[];
  formData?: object;
  formSchema?: any[];
  activeFormId: string;
} // local interface for data properties

export default Vue.extend({
  name: 'Home',
  components: {
    // 'todo-component': TodoComponent,
    // 'app-checkbox': AppCheckbox,
    'form-index': FormIndex,
    'form-summary': FormSummary,
  },
  data: (): IData => ({
    activeFormId: '',
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
    formData: {
      ownerName: 'sumit',
      gender: 'female',
      address: '',
      dob: '',
      mobile: '',
      tnc: [],
      emailId: '',
      pincode: '',
      state: '',
      city: '',
      registrationNumber: '',
      regDate: '',
      engineNumber: '',
      chassisNumber: '',
      expiryDate: '',
      prevPolicyInsurer: '',
      prevPolicyNumber: '',
      claimInPastYear: '',
      prevNCB: '',
    },
    formSchema: [],
  }),
  created(): void {
    get('https:/jsonblob.com/api/d1ab0271-aa12-11ea-a88a-e3742b354a00', true).then((res) => {
      this.formSchema = res;
    });
  },
  computed: {},
  methods: {
    onStepClick(event: IStepClickEvent): void {
      this.activeFormId = event.containerId;
    },
    handleEvent(eventName: string, fieldId: string, value?: any): void {
      console.log(eventName, fieldId, value);
      switch (fieldId) {
        case 'gender': {
          (this.$refs.formRef as any).getFieldRef('mobile').disableField();
          break;
        }
        default:
      }
    },
  },
});
</script>
