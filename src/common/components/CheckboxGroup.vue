<template>
  <ul :class="['checkboxGroup', align === 'horizontal' && 'checkboxGroup--horizontal']">
    <li class="checkboxGroup__checkboxItem" v-for="(item, index) in chechboxItems" :key="index">
      <!--
        triggered on any checkbox click
        @event onClick
      -->
      <app-checkbox
        @onClick="onItemChecked(index)"
        :checked="item.checked"
        :disabled="item.disabled"
        :value="item.value"
        :label="item.label"
        :customCssClasses="item.customCssClasses"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import AppCheckbox from './AppCheckbox.vue';
import { IValidationRule, IValidation } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// local interface for data object
interface ICheckboxGroupData {
  selectedValues: Array<number>;
  validation: IValidation;
}

export interface ICheckboxData {
  checked: boolean;
  value: string;
  label: string;
  disabled: boolean;
  customCssClasses: Array<string>;
}

export default Vue.extend({
  name: 'CheckboxGroup',
  /**
   * Child components -
   * AppCheckbox to populate the checkboxes
   */
  components: {
    'app-checkbox': AppCheckbox,
  },
  /**
   * Model of the component
   * prop contains the state of the component
   * event contains the events of the component
   */
  model: {
    prop: 'selectedValues',
    event: 'onChange',
  },
  props: {
    /**
     * The array of values of the checkbox items
     * @values [{ checked: false, value: '', label: '', disabled: false, customCssClasses: [] }]
     */
    chechboxItems: {
      type: Array as () => Array<ICheckboxData>,
      default: (): Array<ICheckboxData> => [],
    },
    /**
     * The alignment of the checkbox items
     * @values 'horizontal' or 'vertical'(default)
     */
    align: {
      type: String,
      default: 'vertical',
    },
    /**
     * The array of classes to customize the checkbox
     * @values []
     */
    customCssClasses: {
      type: Array,
      default: (): Array<string> => [],
    },
    /**
     * Validations array of objects of type IValidationRule to valdiate the checkbox group
     * @values Array<IValidationRule>
     */
    validations: {
      type: Array as () => Array<IValidationRule>,
      default: (): Array<IValidationRule> => [] as Array<IValidationRule>,
    },
  },
  data: (): ICheckboxGroupData => ({
    selectedValues: [],
    validation: { isValid: true } as IValidation,
  }),
  methods: {
    /**
     * Calls the validationHandler to check the validations, whether the state of checkbox group is valid or not
     * @returns boolean whether current state of the checkbox group is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(this.selectedValues, this.validations);
      return this.validation.isValid;
    },
    /**
     * Gets called when the user clicks on any of the checkbox or its label
     * @public
     * @param {number} index index of the checkbox on which user has clicked
     */
    onItemChecked(index: number): void {
      const itemPos: number = this.selectedValues.indexOf(index + 1);
      // Remove the item if the selectedValues list has already have the checked item
      // else push it in the selectedValues list
      if (itemPos > -1) {
        this.selectedValues.splice(itemPos, 1);
      } else {
        this.selectedValues.push(index + 1);
      }
      /**
       * onClick event to be called when checkbox is clicked.
       * @event onClick
       */
      this.$emit('onChange', this.selectedValues);
    },
  },
});
</script>

<style scoped>
.checkboxGroup {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.checkboxGroup--horizontal {
  flex-direction: row;
}

.checkboxGroup__checkboxItem {
  margin: 0;
  padding: 0;
}
</style>
