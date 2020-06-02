<template>
  <div class="single-select">
    <div class="select-handle" tabindex="1" @click="onFocus" @keydown="onKeyDown">
      <label class="dropdown-label">{{ label }}</label>
      <div class="selected-item">
        {{ selectedItem }}
      </div>
    </div>
    <div v-if="showDropdown" class="filtered-list">
      <div v-if="searchable" class="search-block">
        <input
          class="input-field"
          type="text"
          :value="queryValue"
          :placeholder="placeholder"
          ref="searchInput"
          @input="onInputChange"
          @focus="onFocus"
          @keydown="onKeyDown"
        />
        <div v-if="clearable && queryValue.length" class="clear-icon" @click="clearQuery">x</div>
      </div>
      <div
        v-for="(listItem, index) of filteredItems"
        :class="['filtered-item', { active: listItem.value === selectedItem, selected: searchIndex === index }]"
        :key="listItem.value"
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
import { ISelectItem, ISelectItemProps, ISingleSelectData } from '../shared/interfaces';
import { getFilteredItems, transformData } from '../shared/utils';

/**
 * Props
 *
 * disabled: it will disable the component
 * searchable: It will enable the searching
 * placeholder {string}
 * label {string}
 * clearable {Boolean} - clear the input
 * items - [{ label: 'A', value: ''}, { label: 'A', value: ''}]
 * items: Array<string> - ['a','b'],
 * items - array of objects
 * labelKey - This key will be used as the key to get the label value in item
 * valueKey - This key will be used as the key to get the value's value in item
 */

/**
 * Event
 * selectedItems: will return array of selected Items
 */

export default Vue.extend({
  name: 'SingleSelect',
  data: (): ISingleSelectData => ({
    selectedItem: '',
    queryValue: '',
    filteredItems: [] as ISelectItem[],
    searchIndex: 0,
    showDropdown: false,
    mappedItems: [] as ISelectItem[],
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
      type: Array as () => Array<ISelectItemProps | string>,
      default: [],
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
  },
  created(): void {
    this.mappedItems = transformData(this.items, this.labelKey, this.valueKey);
  },
  mounted(): void {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    document.addEventListener('click', this.onBlur);
  },
  updated(): void {
    const searchInputRef: any = this.$refs.searchInput;
    searchInputRef && searchInputRef.focus();
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
      this.filteredItems = getFilteredItems(this.queryValue, this.mappedItems);
    },
    /**
     * It clears the query
     */
    clearQuery(): void {
      this.queryValue = '';
      this.updateAndNotifySelection();
      this.filteredItems = getFilteredItems(this.queryValue, this.mappedItems);
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
      this.filteredItems = getFilteredItems(this.queryValue, this.mappedItems);
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
      this.updateAndNotifySelection(selectedItem.value);
      this.queryValue = '';
      this.filteredItems = [];
      this.searchIndex = 0;
      this.showDropdown = false;
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
          this.searchIndex = this.searchIndex > 0 ? this.searchIndex - 1 : filteredItemsCount - 1;
          break;
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
  },
});
</script>

<style scoped>
.single-select {
  display: flex;
  flex-direction: column;
}

.select-handle {
  display: flex;
  border: 1px solid lightgrey;
  padding-top: 12px;
  margin-top: 4px;
  min-height: 35px;
}

.input-field {
  display: flex;
  flex-grow: 1;
}

.search-block {
  display: flex;
  margin: 10px 20px;
  border: 1px solid lightgray;
}

.input-field {
  width: 100%;
  padding: 0.6rem;
  border: none;
  outline: none;
}

.clear-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px 10px;
}

.selected-items {
  min-height: 68px;
}

.selected-item {
  cursor: pointer;
  margin: 5px;
}

.filtered-list {
  display: flex;
  flex-direction: column;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
}

.filtered-item {
  display: flex;
  padding: 9px;
}

.filtered-item:hover {
  background-color: gainsboro;
}

.select-item {
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
