<template>
  <div class="app-checkbox">
    <div v-if="header">{{ header }}</div>
    <div class="checkbox-input" v-for="item of options" :key="item.label + item.value">
      <input
        type="checkbox"
        :value="item.value"
        :disabled="item.disabled"
        :id="item.value"
        v-model="values"
        @change="handleChange"
      />
      <label :for="item.value" class="checkbox-label">
        <span class="checkbox-text" v-html="item.label"></span>
      </label>
    </div>
    <div v-if="!validation.isValid" class="checkboxErrorMsg">{{ validation.message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IValidationRule, IValidation, ICheckboxOption } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// local interface for data object
interface IAppCheckboxData {
  validation: IValidation;
  values: any[];
}

// Checkbox component
export default Vue.extend({
  name: 'AppCheckbox',
  /**
   * Model of the component
   * prop contains the state of the component
   * event contains the events of the component
   */
  model: {
    prop: 'selectedItems',
    event: 'onChange',
  },
  props: {
    /**
     * The model prop of the checkbox
     */
    selectedItems: {
      type: Array as () => Array<string>,
    },
    header: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array as () => Array<ICheckboxOption>,
    },
    /**
     * The array of classes to customize the checkbox
     * @values Array of classnames(strings)
     */
    customCssClasses: {
      type: Array,
      default: (): Array<string> => [],
    },
    /**
     * Validations array of objects of type IValidationRule to valdiate the checkbox
     * @values Array<IValidationRule>
     */
    validations: {
      type: Array as () => Array<IValidationRule>,
      default: (): Array<IValidationRule> => [] as Array<IValidationRule>,
    },
  },
  data: (): IAppCheckboxData => ({
    values: [],
    validation: { isValid: true } as IValidation,
  }),
  watch: {
    value(): void {
      this.values = [...this.selectedItems];
    },
  },
  methods: {
    /**
     * Calls the validationHandler to check the validations, whether the state of checkbox is valid or not
     * @returns boolean whether current state of the checkbox is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(this.values, this.validations);
      return this.validation.isValid;
    },
    /**
     * Gets called when the user clicks on the checkbox or label
     * @public
     */
    handleChange(): void {
      // Stop click if the checkbox is disabled
      if (this.disabled) {
        return;
      }
      /**
       * onClick event to be called when checkbox is clicked.
       * @event onChange
       */
      this.$emit('onChange', this.values);
    },
  },
});
</script>

<style scoped></style>
