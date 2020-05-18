<template>
  <div class="autoCompleteDropdown">
    <div class="inputContainer">
      <div class="inputControl">
        <label class="inputLabel">{{ label }}</label>
        <div class="inputField">
          <input
            type="text"
            :value="queryValue"
            :placeholder="placeholder"
            @input="onInputChange"
            @keydown="onKeyDown"
            @focus="onFocus"
          />
        </div>
      </div>
      <div class="clearIcon" v-if="clearable && queryValue.length" @click="clearQuery">x</div>
    </div>
    <div class="filteredList" v-if="showDropdown && filteredItems.length">
      <div
        :class="['filteredItem', { active: searchIndex === index }]"
        v-for="(listItem, index) of filteredItems"
        :key="listItem.label"
        @click="onSelection(index)"
      >
        {{ listItem.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { NavigationKeys } from '../shared/enum';

interface IDropdownItem {
  label: string;
  value: string;
}

/**
 * Props
 *
 * disabled: it will disable the component
 * placeholder {string}
 * label {string}
 * clearable {Boolean} - clear the input
 * items - [{ label: 'A', value: ''}, { label: 'A', value: ''}]
 * items: Array<string> - ['a','b'],
 * items - array of objects
 * labelKey
 * valueKey
 */

/**
 * Event
 * selectedItems: will return array of selected Items
 */

export default Vue.extend({
  name: 'autoCompleteDropdown',
  data: () => ({
    selectedItem: '',
    queryValue: '',
    filteredItems: [] as IDropdownItem[],
    searchIndex: 0,
    showDropdown: false,
    mappedItems: [] as IDropdownItem[],
  }),
  props: {
    label: String,
    placeholder: String,
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    items: {
      default: [],
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('click', this.onBlur);
    this.mappedItems = this.transformData(this.items, this.labelKey, this.valueKey);
  },
  beforeDestroy(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.removeEventListener('click', this.onBlur);
  },
  methods: {
    /**
     * On clicking on out of dropdown it will close the suggestions dropdown
     */
    onBlur(evt: any): void {
      // close dropdown when clicked outside
      if (!this.$el.contains(evt.target)) {
        this.showDropdown = false;
      }
    },
    /**
     * On clicking input box, it will open the suggestion list dropdown and will show all items
     */
    onFocus(): void {
      this.showDropdown = true;
      this.filteredItems = this.getFilteredItems(this.queryValue, this.mappedItems);
    },
    /**
     * It clears the query
     */
    clearQuery(): void {
      this.queryValue = '';
      this.updateAndNotifySelection();
      this.filteredItems = this.getFilteredItems(this.queryValue, this.mappedItems);
    },
    /**
     * It gets invoked when user types
     * @param {Event} evt
     */
    onInputChange(evt: any): void {
      this.queryValue = evt.target.value;
      if (this.selectedItem) {
        this.updateAndNotifySelection();
      }
      this.filteredItems = this.getFilteredItems(this.queryValue, this.mappedItems);
    },
    /**
     * List all matching results
     * @param {string} query User Input
     * @param items Array of items
     *
     * @return {IDropdownItem[]} Returns an array of IDropdownItem type
     */
    getFilteredItems(query: string, items: IDropdownItem[]): IDropdownItem[] {
      const itemsMatchedAtZeroIndex: IDropdownItem[] = [];
      const restMatchedItems: IDropdownItem[] = [];

      if (query.length === 0) {
        return items;
      }
      items.forEach((item: IDropdownItem) => {
        const itemLowerCase = item.label.toLowerCase();
        query = query.toLowerCase();
        if (itemLowerCase.includes(query)) {
          if (item.label.startsWith(query)) {
            itemsMatchedAtZeroIndex.push(item);
          } else {
            restMatchedItems.push(item);
          }
        }
      });
      return itemsMatchedAtZeroIndex.concat(restMatchedItems);
    },
    /**
     * On Selecting the item it emits the selection event which have the selected item value
     * @param {number} itemIndex Index of the item clicked
     */
    onSelection(itemIndex: number): void {
      if (!this.filteredItems.length) {
        return;
      }
      const selectedItem = this.filteredItems[itemIndex];
      this.queryValue = selectedItem.label;
      this.updateAndNotifySelection(selectedItem.value);
      this.filteredItems = [];
      this.searchIndex = 0;
    },
    /**
     * On change of selected Item, it updates the selected Item and emits the selection event
     * @param {string} selectedItem
     */
    updateAndNotifySelection(selectedItem = ''): void {
      this.selectedItem = selectedItem;
      this.$emit('selection', selectedItem);
    },
    /**
     * This function is to used by the parent Component to get the current Selected Item
     */
    getSelection(): string {
      return this.selectedItem;
    },
    /**
     * It handles the navigation and enter key press
     * @param {Event} event
     */
    onKeyDown(event: any): void {
      const filteredItemsCount = this.filteredItems.length;

      // if filtered Items count is zero then disable navigation
      if (filteredItemsCount < 0) {
        return;
      }

      switch (event.keyCode) {
      case NavigationKeys.ARROW_UP:
        if (this.searchIndex > 0) {
          this.searchIndex -= 1;
        } else {
          this.searchIndex = filteredItemsCount - 1;
        }
        break;
        // Arrow Down
      case NavigationKeys.ARROW_DOWN:
        this.searchIndex += 1;
        if (this.searchIndex > filteredItemsCount - 1) {
          this.searchIndex = 0;
        }
        break;
      case NavigationKeys.ENTER:
        this.onSelection(this.searchIndex);
        break;
      default:
        break;
      }
    },
    /**
     * It tranforms the data into the array of objects having type IDropdownItem
     * @param items It can be array of strings or array of object
     * @param {string} labelKey Key to used in the object to get the label
     * @param {string} valueKey Key to used in the object to get the value
     */
    transformData(items: (string | object)[], labelKey = 'label', valueKey = 'value'): IDropdownItem[] {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return items.map((item: any) => {
        if (typeof item === 'object' && item !== null) {
          return { label: item[labelKey], value: item[valueKey] };
        }
        return { label: item, value: item };
      });
    },
  },
});
</script>

<style scoped>
.autoCompleteDropdown {
  display: flex;
  flex-direction: column;
}

.inputContainer {
  display: flex;
  border: 1px solid lightgrey;
  padding-top: 12px;
  margin-top: 4px;
}

.inputControl {
  display: flex;
  flex-grow: 1;
}

.inputField {
  display: flex;
  flex-grow: 1;
}

.inputLabel {
  position: absolute;
  color: rgba(0, 0, 0, 0.87);
  transform: translateY(-12px) scale(0.75);
  margin-left: 5px;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: none;
  outline: none;
}

.clearIcon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px 10px;
}

.selectedItems {
  min-height: 68px;
}

.selectedItem {
  cursor: pointer;
  margin: 5px;
}

.filteredList {
  display: flex;
  flex-direction: column;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}

.filteredItem {
  display: flex;
  padding: 9px;
}

.filteredItem:hover {
  background-color: gainsboro;
}

.selectItem {
  display: flex;
  padding: 5px 23px;
  font-size: 12px;
  cursor: pointer;
}

.active {
  background-color: lightgray;
}

.selected {
  background: #efeff4;
}
</style>
