<template>
  <transition name="modal-fade">
    <div :class="[!hideOverlay && 'modal-backdrop']" @click="onOverlayClicked">
      <div :class="['modal', fullScreen && 'modal-fullscreen']" role="dialog" aria-labelledby="modalTitle"
        aria-describedby="modalDescription" ref="modalContainer" @click="modalClicked">
        <header class="modal-header">
          <slot name="header">
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

// To keep the original height and overflow of body to restore it on modal close
let bodyHeight = '';
let bodyOverflowY = '';

/**
 * Props -
 *
 * showModal: Boolean - Controls whether the component is visible or hidden.
 * persistent: Boolean - Clicking outside of the element will not deactivate it.
 * hideOverlay: Boolean - Hides the display of the overlay.
 * fullScreen: Boolean - Changes layout for fullscreen display.
 */
export default Vue.extend({
  name: 'AppDialog',
  model: {
    prop: 'showModal',
    event: 'close',
  },
  props: {
    showModal: Boolean,
    fullScreen: Boolean,
    hideOverlay: Boolean,
    persistent: Boolean,
  },
  methods: {
    close(): void {
      this.$emit('close');
    },
    onOverlayClicked(): void {
      if (!this.persistent) {
        this.$emit('overlayClicked');
        this.close();
      }
    },
    modalClicked(event: any): void {
      event.stopPropagation();
    },
  },
  watch: {
    showModal(value: boolean): void {
      // To stop scrolling the cotent behind overlay
      if (value) {
        bodyHeight = document.body.style.height;
        bodyOverflowY = document.body.style.overflowY;
        document.body.style.height = '100vh';
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = bodyOverflowY || '';
        document.body.style.height = bodyHeight || '';
      }
    },
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-fullscreen {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

</style>
