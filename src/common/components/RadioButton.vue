<template>
  <div>
    <div v-for="radioItem in items" :key="radioItem.value" class="radioButton">
      <div class="radioButton__box" @click="handleChange(radioItem.value)">
        <div v-if="selectedItem === radioItem.value" class="radioButton--tick">{{ '&#x2714;' }}</div>
      </div>
      <div class="radioButton__label">{{ radioItem.label }}</div>
    </div>
    <div v-if="!validation.isValid" class="textboxErrorMsg">{{ validation.message }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IValidation, IValidationRule } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// local interface for items properties
interface IItemProps {
  value: string;
  label: string;
}

interface IRadioButtonData {
  validation: IValidation; // To store the validation object
}

export default Vue.extend({
  name: 'RadioButton',
  model: {
    prop: 'selectedItem',
    event: 'onChange',
  },
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
    selectedItem: {
      type: String,
      default: '',
    },
    items: {
      type: Array as () => Array<IItemProps>,
      default: (): Array<IItemProps> => [],
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
    validation: { isValid: true } as IValidation,
  }),
  methods: {
    handleChange(value: string): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onChange', value);
    },
    /**
     * Calls the validationHandler to check the validations, whether the state of input is valid or not
     * @returns boolean whether current state of the input is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(this.selectedItem, this.validations);
      return this.validation.isValid;
    },
  },
});
</script>

<style scoped>
.radioButton {
  display: flex;
  flex: 1;
  margin: 10px;
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
