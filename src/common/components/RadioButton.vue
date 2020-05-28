<template>
  <div>
    <div v-for="(radioItems, index) in items" :key="radioItems.value" class="radioButton">
      <div class="radioButton__box" @click="onHandleClick(index)"></div>
      <div v-if="selectedItem === radioItems.value" class="radioButton--tick">{{ '&#x2714;' }}</div>
      <div class="radioButton__label">{{ radioItems.label }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// local interface for items properties
interface IItemProps {
  value: string;
  label: string;
}

export default Vue.extend({
  name: 'RadioButton',
  model: {
    prop: 'selectedItem',
    event: 'onValueChange',
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
      default: [],
    },
  },
  methods: {
    onHandleClick(e: number): void {
      // Event to be discarded if input is disabled
      if (this.disabled) {
        return;
      }
      this.$emit('onValueChange', this.items[e].value);
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
