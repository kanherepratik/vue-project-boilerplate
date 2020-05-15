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
            @keydown="onkeydown"
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

enum NavigationKeys {
  ENTER = 13,
  ARROW_UP = 38,
  ARROW_DOWN = 40,
}

interface IItem {
  label: string;
  value: string;
}

/**
 * Props
 *
 * disabled: it will disable the component
 * searchable {Boolean} - it will turn off the autocomplete
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
    filteredItems: [] as IItem[],
    searchIndex: 0,
    clearable: true,
    showDropdown: false,
    mappedItems: [] as IItem[],
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onBlur(evt: any): void {
      // close dropdown when clicked outside
      if (!this.$el.contains(evt.target)) {
        this.showDropdown = false;
      }
    },
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInputChange(evt: any): void {
      this.queryValue = evt.target.value;
      if (this.selectedItem) {
        this.updateAndNotifySelection();
      }
      this.filteredItems = this.getFilteredItems(this.queryValue, this.mappedItems);
    },
    /**
     * List all matching results
     * @param query User Input
     * @param items Array of items
     *
     * @return {IItem[]} returns an array of IItem type
     */
    getFilteredItems(query: string, items: IItem[]): IItem[] {
      const itemsMatchedAtZeroIndex: IItem[] = [];
      const restMatchedItems: IItem[] = [];

      if (query.length === 0) {
        return items;
      }
      items.forEach((item: IItem) => {
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
     * @param itemIndex Index of the item clicked
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
    updateAndNotifySelection(selectedItem = ''): void {
      this.selectedItem = selectedItem;
      this.$emit('selection', selectedItem);
    },
    getSelection(): string {
      return this.selectedItem;
    },
    /**
     * It handles the navigation and enter key press
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onkeydown(event: any): void {
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
     * It tranforms the data into the array of objects having type IItem
     * @param items It can be array of strings or array of object
     * @param labelKey Key to used in the object to get the label
     * @param valueKey Key to used in the object to get the value
     */
    transformData(items: (string | object)[], labelKey = 'label', valueKey = 'value'): IItem[] {
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
