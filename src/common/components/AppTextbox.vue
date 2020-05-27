<template>
  <div class="appTextbox">
    <div class="textboxContainer">
      <div v-if="label" class="textboxContainer__label">{{ label }}</div>
      <!--
        triggered on any checkbox click
        @event onChange
      -->
      <input
        class="textboxContainer__input"
        v-model="inputValue"
        :type="inputType"
        :autofocus="autoFocus"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <div v-if="clearable" class="textboxContainer__clearIcon">{{ clearIcon }}</div>
    </div>
    <div v-if="!validation.isValid" class="textboxErrorMsg">{{ validation.message }}</div>
    <div v-else-if="message" class="textboxMsg">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IValidationRule, IValidation } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// local interface for data properties
interface IAppTextboxData {
  inputValue: string;
  validation: IValidation; // To store the validation object
}

export default Vue.extend({
  name: 'AppTextbox',
  /**
   * Model of the component
   * prop contains the state of the component
   */
  model: {
    prop: 'value',
    event: 'onBlur',
  },
  props: {
    /**
     * Type of input
     * @values String
     * @default ""
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * Type of input
     * @values String
     * @default text
     */
    inputType: {
      type: String,
      default: 'text',
    },
    /**
     * Focus state of input
     * @values Boolean
     * @default false
     */
    autoFocus: {
      type: Boolean,
      default: false,
    },
    /**
     * Max length of the input
     * @values Number
     */
    maxlength: Number,
    /**
     * Flag to show the clear input symbol
     * @values Boolean
     * @default false
     */
    clearable: {
      type: Boolean,
      default: false,
    },
    /**
     * Clear icon to be shown if the input can be clear using the icon
     * @values String
     * @default x
     */
    clearIcon: {
      type: String,
      default: 'x',
    },
    /**
     * Disabled state of input
     * @values Boolean
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Label to be shown above the input
     * @values String
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Placeholder to be shown on the input
     * @values String
     */
    placeholder: {
      type: String,
      default: '',
    },
    /**
     * Message to be shown below the input
     * @values String
     */
    message: {
      type: String,
      default: '',
    },
    /**
     * Validations array of objects of type IValidationRule to valdiate the input
     * @values Array<IValidationRule>
     */
    validations: {
      type: Array as () => Array<IValidationRule>,
      default: (): Array<IValidationRule> => [] as Array<IValidationRule>,
    },
  },
  data: (): IAppTextboxData => ({
    inputValue: '',
    validation: { isValid: true } as IValidation,
  }),
  created(): void {
    this.inputValue = this.$props.value;
  },
  methods: {
    /**
     * Calls the validationHandler to check the validations, whether the state of input is valid or not
     * @returns boolean whether current state of the input is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(this.inputValue, this.validations);
      return this.validation.isValid;
    },
    /**
     * onChange to be called in case of value change of input, emits onChange event
     * @public
     */
    onChange(): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onChange', this.inputValue);
    },
    /**
     * onFocus to be called in case of input gets focus, emits onFocus event
     * @public
     */
    onFocus(): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onFocus', this.inputValue);
    },
    /**
     * onBlur to be called in case of input gets blur, emits onBlur event
     * @public
     */
    onBlur(): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onBlur', this.inputValue);
    },
  },
});
</script>
