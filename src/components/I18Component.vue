<template>
  <div>
    <button @click="setLocale('en')">English</button>
    <button @click="setLocale('es')">Spanish</button>
    <p>{{ $d(new Date(), 'long') }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'I18Component',
  data() {
    return {
      name: 'Vue', // Named Formatting example
    };
  },
  methods: {
    setLocale(locale: string): void {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', locale);
    },
  },
});
</script>
