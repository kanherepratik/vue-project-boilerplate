<template>
  <div>
    <component
      v-if="schema.component"
      :is="componentMap[schema.component].component"
      v-model="data[schema.id]"
      v-on:[componentMap[schema.component].eventProp]="(value) => handleEvent(schema.handler, value)"
      v-bind="schema.otherProps"
      :ref="schema.id"
    />
  </div>
</template> 

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IWrapperComponentSchema, IComponentMap } from '../interfaces/common';
import componentMap from '../componentMap';

interface IWrapperComponent {
  getValue: () => void;
  isValid: (showError: boolean) => boolean;
  setValue: (value: any) => boolean;
}

@Component
export default class WrapperComponent extends Vue {
  @Prop({ type: Object, required: true }) private schema!: IWrapperComponentSchema;
  @Prop({ required: true }) private data!: any;
  private componentMap: IComponentMap = componentMap;
  private value!: any;

  public mounted() {}

  public getValue = () => {
    // return value
    return this.value;
  };

  private getComponentValue = (value: any) => {
    // switch 'Calendar':
    //     return value.value;
  };

  public handleEvent(fn: any, value: any): void {
    this.value = value;
    // TODO: find a better way of calling handlers
    (this as any)[fn](value);
  }

  public handleChange(value: any) {
    if ((this.$refs[this.schema.id] as any).isValid()) {
      this.$emit('onChange', this.schema.id, value);
    }
    // value = this.getComponentValue(value);
  }

  public handleBlur(value: any) {
    if (this.isValid(true)) {
      this.$emit('onBlur', this.schema.id, value);
    }
  }

  public isValid = (showError: boolean = false): boolean => {
    return (this.$refs[this.schema.id] as any).isValid(showError);
  };

  // setValue = (value: any) => {
  //   return true;
  // };
}
</script>