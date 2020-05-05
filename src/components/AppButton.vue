<template>
    <div class="appButtonContainer">
        <!--
          trigered on click
          @event click
        -->
        <div :class="['btn', computedSizeClass, ...customCssClasses]" :disabled="disabled" @click="emitClick">
            <!-- @slot Use this slot for button name -->
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface IStyles {
    backgroundColor: string;
}

/**
 *
 * List of Props
 * 1. disabled: true or false (Default value - true)
 * 2. size: small, normal, large (Default value - normal)
 * 3. customCssClasses: An array of classes to apply on button
 */

export default Vue.extend({
    name: 'AppButton',
    props: {
        /**
         * The state of the button
         * @values true, false
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * The size of the button
         * @values small, large
         */
        size: {
            type: String,
            default: 'normal'
        },
        /**
         * The size of the button
         * @values small, large
         */
        customCssClasses: {
            type: Array,
            default: (): Array<string> => []
        }
    },
    methods: {
        /**
         * Gets called when the user clicks on the button
         * @public This is a public method
         */
        emitClick(): void {
            /**
             * click event.
             * @event click
             */
            this.$emit('click');
        }
    },
    computed: {
        computedSizeClass(): string {
            return `btn-${this.size}`;
        }
    }
});
</script>

<style scoped>
.appButtonContainer .btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.appButtonContainer .btn.btn-normal {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    border: 1px solid black;
    cursor: pointer;
    background-color: #f5f5f5;
}
</style>
