<template>
  <div class="date-picker">
    <date-picker
      :mode="mode"
      :popover="{ placement: 'auto', visibility: 'click' }"
      :min-date="minDate"
      :max-date="maxDate"
      :value="configuredDates"
      @input="onDateChange"
    >
      <div class="input-slot" slot-scope="{ inputProps, inputEvents }">
        <input
          id="date"
          :class="['input-field', { 'border-red-600': errorMessage }]"
          v-bind="inputProps"
          :placeholder="placeholder"
          v-on="inputEvents"
        />
        <div class="calendar-icon">&#128197;</div>
      </div>
    </date-picker>
    <div v-if="errorMessage" class="errormsg">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { DatePickerMode } from '../shared/enum';

/**
 * It is used to select the date
 *
 * Props:
 * mode: It tells whether to allow single, multiple or ranges.
 *       Possible Values - Enum DatePickerMode
 *       Note - (Currently, it supports the single date select mode only)
 * minDate: Before the minDate all dates will be disabled.
 * maxDate: After this date all dates will be disabled
 * dates: Currently, it takes the single date object only
 * placeholder
 *
 * NOTE -
 * The proposed dates value for rest modes can be-
 * single - Date Object
 * multiple - Array of Date Object
 * range - Array of object have structure{ start: Date, end: Date, span: number}
 *
 */

export default Vue.extend({
  name: 'DatePicker',
  data() {
    return {
      configuredDates: '',
      selectedDate: '',
      errorMessage: '',
    };
  },
  props: {
    mode: {
      type: String,
      default: DatePickerMode.SINGLE,
    },
    minDate: Date,
    maxDate: Date,
    dates: Date,
    placeholder: String,
  },
  created() {
    this.configuredDates = this.dates;
  },
  methods: {
    /**
     * It is called when the user selects the date
     * @param {Date} date User selected date
     */
    onDateChange(date: any): void {
      this.selectedDate = date;
      /**
       * It emits the date selected by the user
       */
      this.$emit('input', date);
    },
    /**
     * This method is to be used by the parent component to get the current selected date
     */
    getValue(): string {
      return this.selectedDate;
    },
  },
  components: {
    'date-picker': DatePicker,
  },
});
</script>

<style scoped>
.date-picker {
  display: flex;
}
.input-slot {
  display: flex;
  border: 1px solid gray;
  padding: 2px;
}
.input-field {
  border: none;
  outline: none;
  padding: 5px;
}
.calendar-icon {
  cursor: pointer;
}
</style>
