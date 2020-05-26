/* eslint-disable consistent-return */
import Vue from 'vue';
import { commaSepratedAmount, getAmountInWords, formatDate } from './utils';

Vue.filter('currency', (value: number): string => `₹ ${commaSepratedAmount(value)}`);

Vue.filter('amountInWords', (value: number, precision = 1, factor = 1000, shortUnit = false): string | undefined => {
  if (value === null || value === undefined) {
    return;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value)) {
    return;
  }
  const amount = Number(value);
  return `₹ ${getAmountInWords(amount, precision, factor, shortUnit)}`;
});

Vue.filter('amountInCurrency', (value: number): string => `₹ ${value}`);

Vue.filter('shortnedString', (value: string, charCount = 10): string | undefined => {
  if (!value) {
    return;
  }
  const str = value.toString();
  return str.length > charCount ? `${str.substr(0, charCount)}...  ` : str;
});

Vue.filter('roundedAmount', (value: number, precision = 1): number => {
  return Math.round((value * 10 ** precision) / 10 ** precision);
});

Vue.filter('pascalCaseToNormal', (value: string): string | undefined => {
  if (value === null || value === undefined) {
    return;
  }
  return value.replace(/[A-Z]/g, (replaceText): string => {
    return ` ${replaceText}`;
  });
});

Vue.filter('lowercase', (value: string): string | undefined => {
  if (value === null || value === undefined) {
    return;
  }
  return value.toLowerCase();
});

Vue.filter('percentage', (value: number, precision = 1, isDecimal = false): string | undefined => {
  if (value === null || value === undefined) {
    return;
  }

  if (typeof value !== 'number') {
    return value;
  }

  if (isDecimal) {
    // eslint-disable-next-line no-param-reassign
    value *= 100;
  }
  return `${Math.round((value * 10 ** precision) / 10 ** precision) / 10 ** precision} %`;
});

Vue.filter('date', (value: string | Date, format = 'D/M/YYYY'): string => {
  if (value === null || value === undefined) {
    return '';
  }
  return formatDate(new Date(value), format);
});
