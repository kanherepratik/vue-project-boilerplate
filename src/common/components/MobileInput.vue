<template>
  <div>
    <div v-if="label" class="textboxContainer__label">{{ label }}</div>
    <input
      ref="input"
      type="tel"
      v-model="inputValue"
      :autofocus="autoFocus"
      :disabled="disabled"
      :placeholder="placeholder"
      :maxlength="maxLen"
      @input="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="!validation.isValid">{{ validation.message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IValidationRule, IValidation } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// local interface for data properties
interface IMobileInput {
  inputValue: string;
  validation: IValidation; // To store the validation object
}

export default Vue.extend({
  name: 'MobileInput',
  props: {
    /**
     * Type of input
     * @values {String, Number}
     * @default ""
     */
    value: {
      type: [String, Number],
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
     * Disabled state of input
     * @values Boolean
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
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
     * Max length of the input
     * @values Number
     */
    maxLen: Number,
    /**
     * Label to be shown above the input
     * @values String
     */
    label: {
      type: String,
      default: '',
    },
  },
  data: (): IMobileInput => ({
    inputValue: '',
    validation: { isValid: true } as IValidation,
  }),
  mounted(): void {
    this.inputValue = String(this.$props.value || '');
  },
  watch: {
    value(): void {
      this.inputValue = String(this.$props.value || '');
    },
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
    onChange(event: any): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('input', this.inputValue, event);
    },
    /**
     * onFocus to be called in case of input gets focus, emits onFocus event
     * @public
     */
    onFocus(event: any): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onFocus', this.inputValue, event);
    },
    /**
     * onBlur to be called in case of input gets blur, emits onBlur event
     * @public
     */
    onBlur(event: any): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onBlur', this.inputValue, event);
    },
  },
});
</script>

<style></style>
