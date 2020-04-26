<template>
    <div>
        <div>{{ dataExample }}</div>
        <div @click="methodExample()">{{ computedExample }}</div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import todoMixin from '../mixins/todoMixin';

type ComplexObjectInterface = {
    testProp: string;
    modelName: number;
};
export default Vue.extend({
    mixins: [todoMixin],
    props: {
        propExample: {
            type: Object as PropType<ComplexObjectInterface>
        }
    },
    data() {
        return {
            dataExample: 'This Property Will Be Data'
        };
    },
    computed: {
        computedExample(): string {
            return `${this.dataExample} ${this.propExample.testProp} ${this.propExample.modelName} Computed Property Example`;
        }
    },
    methods: {}
});
</script>
