<template>
  <div class="registrationInput">
    <span v-if="registrationPrefix" class="registrationPrefix">{{ registrationPrefix }}</span>
    <app-textbox
      :class="['registrationNumber', registrationPrefix && 'registrationSuffix']"
      inputType="text"
      :value="registrationNumber"
      :autoFocus="true"
      :maxLength="maxLength"
      :clearable="clearable"
      :clearIcon="clearIcon"
      :disabled="disabled"
      :label="label"
      :placeholder="placeholder"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppTextbox from './AppTextbox.vue';
import { IValidationRule, IValidation } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// local interface for data properties
interface IRegistrationInputData {
  registrationValidations: Array<IValidationRule>;
  registrationNumber: string;
  validation: IValidation;
}

export default Vue.extend({
  name: 'RegistrationInput',
  components: {
    'app-textbox': AppTextbox,
  },
  props: {
    /**
     * Registration prefix (usually code of the RTO) of the registration which will not be editable
     * @values Number
     */
    registrationPrefix: {
      type: String,
      default: '',
    },
    /**
     * Max length of the registration input
     * @values Number
     */
    maxLength: Number,
    /**
     * Flag to show the clear input registration symbol
     * @values Boolean
     * @default false
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * Clear icon to be shown if the registration input can be clear using the icon
     * @values String
     * @default x
     */
    clearIcon: {
      type: String,
      default: 'x',
    },
    /**
     * Disabled state of registration input
     * @values Boolean
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Label to be shown above the registration input
     * @values String
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Placeholder to be shown on the registration input
     * @values String
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * Message to be shown below the registration input
     * @values String
     */
    message: {
      type: String,
      default: '',
    },
    /**
     * Validations array of objects of type IValidationRule to valdiate the registration input
     * @values Array<IValidationRule>
     */
    validations: {
      type: Array as () => Array<IValidationRule>,
      default: (): Array<IValidationRule> => [] as Array<IValidationRule>,
    },
    /**
     * Error message if registration number is not in the correct format
     * @values Array<IValidationRule>
     */
    errorMessage: {
      type: String,
      default: 'Please enter valid registration number',
    },
  },
  data: (): IRegistrationInputData => ({
    registrationValidations: [] as Array<IValidationRule>,
    registrationNumber: '',
    validation: { isValid: true } as IValidation,
  }),
  created(): void {
    this.registrationValidations.push({
      name: 'regex',
      expression: '^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$',
      message: this.errorMessage,
    });
  },
  methods: {
    /**
     * Calls the validationHandler to check the validations, whether the state of input is valid or not
     * @returns boolean whether current state of the input is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(
        `${this.registrationPrefix}${this.registrationNumber}`,
        this.registrationValidations
      );
      return this.validation.isValid;
    },
  },
});
</script>

<style scoped>
.registrationInput {
  display: flex;
  flex-direction: row;
  width: 200px;
  flex: 1;
}

.registrationPrefix {
  display: inline-block;
  border-radius: 4px 0 0 4px;
  background-color: #ddd;
  padding: 2px;
}

.registrationNumber {
  display: flex;
  flex: 1;
}

.registrationSuffix {
  display: flex;
  flex: 1;
}
</style>
