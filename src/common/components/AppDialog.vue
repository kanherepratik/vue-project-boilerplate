<template>
  <transition name="modal-fade">
    <div :class="[!hideOverlay && 'modal-backdrop']" @click="onOverlayClicked">
      <div :class="['modal', fullScreen && 'modal-fullscreen']" role="dialog">
        <header class="modal-header">
          <slot name="header"></slot>
        </header>
        <section class="modal-body">
          <slot name="body"></slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click.prevent="onClose">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AppDialog',
  props: {
    fullScreen: Boolean,
    hideOverlay: Boolean,
    persistent: Boolean,
  },
  created(): void {
    // tslint:disable no-unused-expressions
    document.querySelector('body')?.classList.add('modal-open');
  },
  destroyed(): void {
    // tslint:disable no-unused-expressions
    document.querySelector('body')?.classList.remove('modal-open');
  },
  methods: {
    onClose(): void {
      this.$emit('close');
    },
    onOverlayClicked(): void {
      if (!this.persistent) {
        this.$emit('overlayClicked');
        this.onClose();
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
