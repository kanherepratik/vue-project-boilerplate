<template>
  <transition-group name="toasts" tag="div" :class="['app-toast', this.position]">
    <div v-for="toast in toasts" class="toast-item" :key="toast.id">
      <span class="toast-text">{{ toast.text }}</span>
      <span v-if="closeable" class="close-button" @click="removeToast(toast.id)">X</span>
    </div>
  </transition-group>
</template>

<script lang="ts">
import Vue from 'vue';
import { ICustomToast, IToast } from '../shared/interfaces';
import { AppToastPosition } from '../shared/enum';

/**
 * Toast Component to show messages/alerts
 *
 * props:
 * toast {IToast}: A object having structure IToast
 * position {AppToastPosition}: Positions of toast
 * closeable {Boolean}: It makes the toast closeable
 */
export default Vue.extend({
  data() {
    return {
      toasts: [] as ICustomToast[],
    };
  },
  props: {
    /**
     * A object having structure IToast
     */
    toast: {
      type: Object as () => IToast,
      default: null,
    },
    /**
     * Positions of toast
     */
    position: {
      type: String as () => AppToastPosition,
      default: AppToastPosition.TOP_RIGHT,
    },
    /**
     * It makes the toast closeable
     */
    closeable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    /**
     * It pushes the toast into toasts array and fires the setTimeout to remove the toast
     *
     */
    addToast({ text = '', duration = 4000 }): void {
      const id = Math.random();
      this.toasts.push({ id, text });
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    },
    /**
     * It removes the toast from toasts array
     * @param {number} id Id of the toast to be deleted
     */
    removeToast(id: number): void {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
</script>

<style scoped>
.app-toast {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10000;
}

.top-right {
  top: 10%;
  right: 7%;
}

.top-left {
  top: 10%;
  left: 7%;
}

.top-center {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-right {
  right: 5%;
  bottom: 7%;
}

.bottom-left {
  left: 5%;
  bottom: 7%;
}

.bottom-center {
  left: 50%;
  transform: translateX(-50%);
  bottom: 7%;
}

.toast-item {
  border: 1px solid black;
  padding: 5px;
}

.close-button {
  cursor: pointer;
  margin: 0px 5px;
}
</style>
