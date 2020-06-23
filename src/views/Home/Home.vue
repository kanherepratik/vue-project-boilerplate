<template>
  <div class="home">
    <!-- <todo-component />
    <app-checkbox />-->
    <form-index
      :formSchema="formSchema"
      :formData="formData"
      :componentMap="componentMap"
      :signal="signals"
      @emit="handleEvent"
      ref="formRef"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import TodoComponent from '@/components/TodoComponent.vue';
import { get } from '@/services/api';
import { IContainerSchema, IComponentMap } from '@/FormBuilder/shared/interfaces';
import { signals as SIGNAL } from '@/FormBuilder/shared/signals';
import FormIndex from '@/FormBuilder/FormIndex.vue';
import componentMap from '@/shared/config/componentMap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IData {
  options?: any[];
  selectedItems?: any[];
  validations?: any[];
  formData?: object;
  formSchema?: any[];
  componentMap: { [key: string]: IComponentMap };
  signals: { [key: string]: () => boolean };
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
    formData: {
      ownerName: '',
      gender: '',
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
    componentMap,
    signals: {},
  }),
  created(): void {
    get('https:/jsonblob.com/api/d1ab0271-aa12-11ea-a88a-e3742b354a00', true).then((res) => {
      this.formSchema = res;
    });
    this.signals[SIGNAL.ON_BEFORE_VALIDATE] = this.handleOnBeforeValid.bind(this);
    this.signals[SIGNAL.ON_CONTAINER_LOAD] = this.handleOnContainerLoad.bind(this);
    this.signals[SIGNAL.ON_AFTER_SUBMIT] = this.handleOnAfterSubmit.bind(this);
  },
  computed: {},
  methods: {
    handleEvent(eventName: string, fieldId: string, value?: any): void {
      console.log(eventName, fieldId, value);
      switch (fieldId) {
        case 'gender': {
          // (this.$refs.formRef as any).getFieldRef('mobile').disableField();
          break;
        }
        default:
      }
    },

    handleOnBeforeValid(): boolean {
      // can execute some condition and return true/false on that basis
      return true;
    },
    handleOnContainerLoad(): boolean {
      // can execute some condition and return true/false on that basis
      return true;
    },
    handleOnAfterSubmit(): boolean {
      /**
       * API call here on submit of container
       * returns true in case of success else false
       */
      return true;
    },
  },
});
</script>
