<template>
  <div class="appCheckbox">
    <!--
      triggered on click
      @event onClick
    -->
    <div
      :class="['appCheckbox__box', isSelected && 'appCheckbox__active', disabled && 'appCheckbox__disabled']"
      @click="onCheckboxClick"
    >
      <div v-if="isSelected" class="appCheckbox__box__tick">{{ '&#x2714;' }}</div>
    </div>
    <!--
      triggered on click
      @event onClick
    -->
    <div v-if="label" class="appCheckbox__label" @click="onCheckboxClick">{{ label }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// local interface for data object
interface IData {
  isSelected: boolean;
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
    prop: 'checked',
    event: 'onClick',
  },
  props: {
    /**
     * The checked state of the checkbox
     * @values true, false(default)
     */
    checked: {
      type: Boolean,
      default: false,
    },
    /**
     * The value of the checkbox
     * @values String
     */
    value: {
      type: String,
      default: '',
    },
    /**
     * The label text to represent the checkbox
     * @values String
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * The disabled state of checkbox
     * @values true, false(default)
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The array of classes to customize the checkbox
     * @values Array of classnames(strings)
     */
    customCssClasses: {
      type: Array,
      default: (): Array<string> => [],
    },
  },
  data: (): IData => ({
    isSelected: false,
  }),
  created(): void {
    // Set the initial checked state of the checkbox from the props
    this.isSelected = this.checked;
  },
  methods: {
    /**
     * Gets called when the user clicks on the checkbox or label
     * @public
     */
    onCheckboxClick(): void {
      // Stop click if the checkbox is disabled
      if (this.disabled) {
        return;
      }
      // Toggle the state of the checkbox
      this.isSelected = !this.isSelected;
      /**
       * onClick event to be called when checkbox is clicked.
       * @event onClick
       */
      this.$emit('onClick', this.isSelected);
    },
  },
});
</script>

<style scoped>
.appCheckbox {
  display: flex;
  flex: 1;
  margin: 10px;
}

.appCheckbox__box {
  min-width: 20px;
  min-height: 20px;
  max-height: 20px;
  max-width: 20px;
  border: 2px solid #000;
}

.appCheckbox__box:before {
  opacity: 0.2;
  border-radius: 50%;
  position: absolute;
}

.appCheckbox__box:hover:before {
  background-color: #1867c0;
}

.appCheckbox__active {
  background-color: #1867c0;
  color: #fff;
}

.appCheckbox__disabled {
  border-color: #ddd;
}

.appCheckbox__box__tick {
  color: #fff;
}

.appCheckbox__label {
  margin-left: 10px;
  text-align: left;
}
</style>
