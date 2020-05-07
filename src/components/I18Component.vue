<template>
    <div>
        <button @click="setLocale('en')">English</button>
        <button @click="setLocale('es')">Spanish</button>
        <p>{{ $t('message') }}</p>
        <p>{{ $t('goodbye') }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'I18Component',
    methods: {
        setLocale(locale: string): void {
            this.$i18n.locale = locale;
        }
    }
});
</script>
