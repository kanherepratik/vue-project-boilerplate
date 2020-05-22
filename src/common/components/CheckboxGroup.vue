<template>
  <li :class="['checkboxGroup', align === 'horizontal' && 'checkboxGroup--horizontal']">
    <ul class="checkboxGroup__checkboxItem" v-for="(item, index) in chechboxItems" :key="index">
      <!--
        triggered on any checkbox click
        @event onClick
      -->
      <app-checkbox
        @onClick="
          () => {
            onItemChecked(index);
          }
        "
        :checked="item.checked"
        :disabled="item.disabled"
        :value="item.value"
        :label="item.label"
        :customCssClasses="item.customCssClasses"
      />
    </ul>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import AppCheckbox from './AppCheckbox.vue';

// local interface for data object
interface IData {
  selectedValues: Array<number>;
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
  },
  data: (): IData => ({
    selectedValues: [],
  }),
  methods: {
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
