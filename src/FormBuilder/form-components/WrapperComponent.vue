<template>
    <div>
        <component
            v-if="schema.component"
            :is="componentMap[schema.component].component"
            v-bind="schema.otherProps"
            v-model=""
            :ref="schema.id"
            v-on="schema.events" 
        />
        this is wrapper
    </div>
</template> 

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IWrapperComponentSchema } from '../interfaces/common';
import componentMap from '../componentMap'

interface IWrapperComponent {
    getValue: () => void
    isValid: (showError: boolean) => boolean
    setValue: (value: any) => boolean
}

@Component
export default class WrapperComponent extends Vue implements IWrapperComponent {
    @Prop({ type: Object, required: true }) private schema!: IWrapperComponentSchema

    public created = () => {
        //this.handleChange = componentMap[this.schema.component]['eventProp'].bind()
    }

    public getValue = () => {
        // return value
    }

    private getComponentValue = (value) => {
        // switch 'Calendar':
        //     return value.value;
        
            
    }

    public handleChange = (value) => {
        value = this.getComponentValue(value)
    }

    public handleBlur = () => {
        //this.$emit('onblue', componentMap[this.schema.component].id, this.getValue())
    }

    public isValid = (showError: boolean) => {
        // switch 'Multiselect':

        // return this.$ref..value
    }

    setValue = (value: any) => {
        return true
    }

    data = () => ({
        componentMap
    })

}

</script>