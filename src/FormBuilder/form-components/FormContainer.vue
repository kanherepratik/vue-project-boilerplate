<template>
    <div>
        <div v-for="component in schema.children" :key="component.id">
            <wrapper-component
                :schema="component"    
            >
            </wrapper-component>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue'
import { IContainerSchema } from '../interfaces/common';

@Component
export default class FormContainer extends Vue {
    @Prop({ type: Object, required: true }) private schema!: IContainerSchema
    public getValid = () => {
        return false
    }
}
</script>