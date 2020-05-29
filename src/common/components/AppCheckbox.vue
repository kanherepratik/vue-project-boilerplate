<template>
  <div class="appCheckbox">
    <!--
      triggered on click
      @event onClick
    -->
    <div
      :class="['appCheckbox__box', checked && 'appCheckbox__active', disabled && 'appCheckbox__disabled']"
      @click="onClick"
    >
      <div v-if="checked" class="appCheckbox__box__tick">{{ '&#x2714;' }}</div>
    </div>
    <!--
      triggered on click
      @event onClick
    -->
    <div v-if="label" class="appCheckbox__label" @click="onClick">{{ label }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IAppCheckboxData, IValidationRule, IValidation } from '../shared/interfaces';
import { validationHandler } from '../shared/validations';

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
     * The label of the checkbox
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
    /**
     * Validations array of objects of type IValidationRule to valdiate the checkbox
     * @values Array<IValidationRule>
     */
    validations: {
      type: Array as () => Array<IValidationRule>,
      default: (): Array<IValidationRule> => [] as Array<IValidationRule>,
    },
  },
  data: (): IAppCheckboxData => ({
    validation: { isValid: true } as IValidation,
  }),
  methods: {
    /**
     * Calls the validationHandler to check the validations, whether the state of checkbox is valid or not
     * @returns boolean whether current state of the checkbox is valid or not
     */
    isValid(): boolean {
      this.validation = validationHandler(this.checked, this.validations);
      return this.validation.isValid;
    },
    /**
     * Gets called when the user clicks on the checkbox or label
     * @public
     */
    onClick(): void {
      // Stop click if the checkbox is disabled
      if (this.disabled) {
        return;
      }
      const value = this.value || this.label;
      /**
       * onClick event to be called when checkbox is clicked.
       * @event onClick
       */
      this.$emit('onClick', !this.checked, value);
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
