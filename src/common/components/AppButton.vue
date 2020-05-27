<template>
  <div class="app-button">
    <!--
      trigered on click
      @event click
    -->
    <button :class="classNames" :disabled="disabled" @click="handleClick">
      <span v-if="loading">loading...</span>
      <span v-else>{{ title }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AppButtonSizes } from '../shared/enum';

/**
 *
 * List of Props
 * 1. disabled: true or false (Default value - true)
 * 2. size {Enum AppButtonSizes}: small, normal, large (Default value - normal)
 * 3. customCssClasses: An array of classes to apply on button
 */

export default Vue.extend({
  name: 'AppButton',
  props: {
    /**
     * Name of the button
     */
    title: String,
    /**
     * The state of the button
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * The size of the button
     * @values small, large
     */
    size: {
      type: String,
      default: AppButtonSizes.NORMAL,
    },
    /**
     * This will show the loading text in the button
     */
    loading: Boolean,
    /**
     * The css to apply to button
     * @values css class names
     */
    customCssClasses: {
      type: Array as () => Array<string>,
      default: (): Array<string> => [],
    },
  },
  methods: {
    /**
     * Gets called when the user clicks on the button
     * @public This is a public method
     */
    handleClick(): void {
      /**
       * click event.
       * @event click
       */
      this.$emit('click');
    },
  },
  computed: {
    classNames(): string[] {
      const sizeClass = `btn-${this.size}`;
      return ['btn', sizeClass, ...this.customCssClasses];
    },
  },
});
</script>

<style scoped>
.app-button .btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.app-button .btn.btn-normal {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  border: 1px solid black;
  cursor: pointer;
  background-color: #f5f5f5;
}
</style>
