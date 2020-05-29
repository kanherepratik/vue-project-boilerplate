<template>
  <div class="checkboxGroup">
    <div v-if="label" class="checkboxGroup__label">{{ label }}</div>
    <ul :class="['checkboxList', align === 'horizontal' && 'checkboxList--horizontal']">
      <li class="checkboxList__checkboxItem" v-for="(item, index) in checkboxItems" :key="`${index}_${toggleUpdated}`">
        <!--
          triggered on any checkbox click
          @event onChange
        -->
        <app-checkbox
          @onChange="onItemChecked"
          :isChecked="item.isChecked"
          :value="item.value"
          :disabled="item.disabled"
          :label="item.label"
          :customCssClasses="item.customCssClasses"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppCheckbox from './AppCheckbox.vue';
import { ICheckboxData, ICheckboxGroupData, IValidationRule, IValidation } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

// CheckboxGroup component
export default Vue.extend({
  name: 'CheckboxGroup',
  /**
   * Child components -
   * AppCheckbox to populate the checkboxes
   */
  components: {
    'app-checkbox': AppCheckbox,
  },
  props: {
    /**
     * The array of values of the checkbox items
     * @values [{ isChecked: false, value: '', label: '', disabled: false, customCssClasses: [] }]
     */
    checkboxItems: {
      type: Array as () => Array<ICheckboxData>,
      default: (): Array<ICheckboxData> => [],
    },
    /**
     * The array of selected values of the checkbox items
     * @values Array<string>
     */
    selectedValues: {
      type: Array as () => Array<string>,
      default: (): Array<string> => [],
    },
    /**
     * Label of the checkbox group list
     * @values String
     */
    label: {
      type: String,
      default: '',
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
    toggleUpdated: false,
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
    onItemChecked(isChecked: boolean, value: string): void {
      // Update checked state of the checkbox item
      this.checkboxItems.map((item: ICheckboxData) => {
        if (item.value === value) {
          item.isChecked = isChecked;
        }
        return item;
      });
      this.toggleUpdated = !this.toggleUpdated;
      const itemPos: number = this.selectedValues.indexOf(value);
      // Remove the item if the selectedValues list has already have the checked item
      // else push it in the selectedValues list
      if (itemPos > -1) {
        this.selectedValues.splice(itemPos, 1);
      } else {
        this.selectedValues.push(value);
      }
      /**
       * onChange event to be called when checkbox is clicked.
       * @event onChange
       */
      this.$emit('onChange', this.selectedValues);
    },
  },
});
</script>

<style scoped>
.checkboxList {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.checkboxList--horizontal {
  flex-direction: row;
}

.checkboxList__checkboxItem {
  margin: 0;
  padding: 0;
}
</style>
