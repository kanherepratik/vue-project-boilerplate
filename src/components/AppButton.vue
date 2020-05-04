<template>
    <!--
      trigered on click
      @event click
    -->
    <button
        :class="[computedSizeClass, computedIsElevateClass, computedRippleClass, computedOutlinedClass]"
        :disabled="disabled"
        :style="computedStyles"
        @click="emitClick"
    >
        <span v-if="loading">{{ loadingText }}</span>
        <!-- @slot Use this slot for button name -->
        <slot v-else></slot>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

interface IStyles {
    backgroundColor: string;
}

/**
 *
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
            default: 'medium'
        },
        /**
         * Applies box shadow to the button
         * @values true, false
         */
        elevated: {
            type: Boolean,
            default: false
        },
        /**
         * Shows ripple effect on click
         * @values true, false
         */
        ripple: {
            type: Boolean,
            default: true
        },
        /**
         * Applies specified color
         * It accepts hexadecimal value of the color
         */
        color: {
            type: String
        },
        /**
         * Makes the background transparent and applies a thin border.
         * @values true, false
         */
        outlined: {
            type: Boolean,
            default: true
        },
        /**
         * Adds a loading icon animation
         * @values true, false
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * It is used with props "loading".
         * Used to replace the loading icon animation with the laoding text.
         */
        loadingText: {
            type: String,
            default: 'processing...'
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
        },
        computedIsElevateClass(): string {
            return this.elevated ? `btn-elevate` : '';
        },
        computedRippleClass(): string {
            return this.ripple ? `btn-ripple` : '';
        },
        computedOutlinedClass(): string {
            return this.outlined ? `btn-outline` : '';
        },
        computedStyles(): IStyles {
            return {
                backgroundColor: this.color
            };
        }
    }
});
</script>

<style>
.btn-medium {
    height: 36px;
    min-width: 64px;
}
</style>
