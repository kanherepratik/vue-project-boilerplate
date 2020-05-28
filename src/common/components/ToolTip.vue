<template>
  <div>
    <p class="popup-box" v-show="hover">{{ message }}</p>
    <div @mouseover="mouseOver">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

// local interface for data object
interface IToolTipData {
  hover: boolean;
}

/**
 *
 * List of Props
 * 1. slot -> on which html element we want to show tooltip
 * 2. Message -> Message we want to show on tooltip hover state
 */

export default Vue.extend({
  name: 'ToolTip',
  props: {
    /**
     * The message text to represent the tooltip
     * @values String
     */
    message: {
      type: String,
      default: '',
    },
  },
  data: (): IToolTipData => ({
    hover: false,
  }),
  methods: {
    /**
     * To Hide tooltip on mover over
     */
    mouseOver(): void {
      this.hover = !this.hover;
    },
  },
});
</script>
<style scoped>
.popup-box {
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  background: #f0f8ff;
  border-radius: 1px;
  box-shadow: 1px 1px 15px 0 rgba(0, 0, 0, 0.2);
  padding: 40px;
  color: #555585;
}
</style>
