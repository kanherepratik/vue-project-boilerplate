<template>
  <div>
    <input
      ref="input"
      type="tel"
      v-model="phone"
      :disabled="disabled"
      :id="inputId"
      :name="name"
      :placeholder="placeholder"
      :maxlength="maxLen"
      :required="required"
      @input="onInput"
      @keyup.enter="onEnter"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/*
 * Use validator for number and replace pattern
 */

export default Vue.extend({
  name: 'MobileInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'telephone',
    },
    placeholder: {
      type: String,
      default: 'Enter Mobile Number',
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxLen: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      phone: '',
    };
  },
  methods: {
    onInput(): void {
      this.$emit('input', this.phone);
    },
    onEnter(): void {
      this.$emit('enter');
    },
  },
});
</script>

<style></style>
