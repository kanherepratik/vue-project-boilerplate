<template>
    <div class="radioButton">
        <div class="radioButton__box" @click="onRadioClicked"></div>
        <div v-if="radioActive === value" class="radioButton--tick">{{ '&#x2714;' }}</div>
        <div v-if="label" class="radioButton__label" @change="onRadioClicked">{{ label }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'RadioButton',
    model: {
        prop: 'radioActive',
        event: 'onRadioUpdate'
    },
    props: {
        value: String,
        label: String,
        disabled: Boolean,
        radioActive: String
    },
    methods: {
        onRadioClicked(): void {
            if (this.disabled) {
                return;
            }
            this.$emit('onRadioUpdate', this.value);
        }
    }
});
</script>

<style scoped>
.radioButton {
    display: flex;
    flex: 1;
    margin: 10px;
}
.radioButton__box {
    min-width: 20px;
    min-height: 20px;
    max-height: 20px;
    max-width: 20px;
    border: 2px solid black;
}
.radioButton__label {
    margin-left: 10px;
    text-align: left;
}
</style>
