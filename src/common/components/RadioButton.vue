<template>
  <div class="radio-button">
    <div class="radioButton__header" v-if="header">{{ header }}</div>
    <div v-for="radioItem in items" :key="radioItem.value">
      <input
        type="radio"
        :value="radioItem.value"
        :disabled="disabled"
        :id="radioItem.value"
        v-model="inputValue"
        @change="handleChange($event, radioItem.value)"
      />
      <label :for="radioItem.value" class="radio-label">
        <span class="radio-text" v-html="radioItem.label"></span>
      </label>
    </div>
    <div v-if="!validation.isValid" class="radioButtonErrorMsg">{{ validation.message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IValidation, IValidationRule, IOption } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

interface IRadioButtonData {
  inputValue: string;
  validation: IValidation; // To store the validation object
}

export default Vue.extend({
  name: 'RadioButton',
  props: {
    /**
     * Disabled state of input
     * @values Boolean
     * @default false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    header: {
      type: String,
      default: '',
    },
    items: {
      type: Array as () => Array<IOption>,
      default: (): Array<IOption> => [],
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
  data: (): IRadioButtonData => ({
    inputValue: '',
    validation: { isValid: true } as IValidation,
  }),
  watch: {
    value(): void {
      this.inputValue = this.$props.value;
    },
  },
  mounted(): void {
    this.inputValue = this.$props.value;
  },
  methods: {
    handleChange(event: any, value: string): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      // this.inputValue = value;
      this.$emit('input', value, event);
    },
    /**
     * Calls the validationHandler to check the validations, whether the state of input is valid or not
     * @returns boolean whether current state of the input is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(this.inputValue, this.validations);
      return this.validation.isValid;
    },
  },
});
</script>

<style scoped>
.radio-button {
  display: flex;
  flex: 1;
  margin: 10px;
}
.radioButton__header {
  text-align: left;
}
.radioButton__box {
  min-width: 20px;
  min-height: 20px;
  max-height: 20px;
  max-width: 20px;
  border: 2px solid black;
}
.radioButton__label {
  margin-left: 10px;
  text-align: left;
}
</style>
