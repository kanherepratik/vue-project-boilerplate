<template>
  <div>
    <component
      :is="componentMap[schema.component].component"
      v-if="!hidden"
      :disabled="disabled"
      v-on="massagedEventMap"
      v-model="data[schema.id]"
      v-bind="schema.otherProps"
      :ref="schema.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IWrapperComponentSchema, IComponentMap, IWrapperComponent, IEventMap } from '../interfaces/common';
import componentMap from '../componentMap';

@Component
export default class WrapperComponent extends Vue {
  @Prop({ type: Object, required: true }) private schema!: IWrapperComponentSchema;
  @Prop({ required: true }) private data!: any;
  private componentMap: IComponentMap = componentMap;
  private value!: any;
  private isDisabled!: boolean;
  private isHidden!: boolean;
  private eventMap: IEventMap = {};

  private get massagedEventMap(): IEventMap {
    for (let event of componentMap[this.schema.component].eventMap) {
      this.eventMap[event] = this.handleEvent;
    }
    return this.eventMap;
  }

  private get hidden(): boolean {
    return this.isHidden;
  }

  private set hidden(value: boolean) {
    this.isHidden = value;
  }

  private get disabled(): boolean {
    return this.isDisabled;
  }

  private set disabled(value: boolean) {
    this.isDisabled = value;
  }

  public isValid = (showError: boolean = false): boolean => {
    return (this.$refs[this.schema.id] as any).isValid(showError);
  };

  public getValue(): any {
    // return value
    return this.value;
  }

  public getFieldRef(fieldId: string): IWrapperComponent {
    return (this.$refs as any)[fieldId];
  }

  public showField(): void {
    this.hidden = false;
  }

  public hideField(): void {
    this.hidden = true;
  }

  public disableField(): void {
    this.isDisabled = true;
  }

  public enableField(): void {
    this.disabled = false;
  }

  public handleEvent(value: any, event: any): void {
    this.$emit('emit', event.type, this.schema.id, value);
  }

  // public handleEvent(fn: any, value: any): void {

  //   this.value = value;
  //   // TODO: find a better way of calling handlers
  //   (this as any)[fn](value);
  // }

  // public handleChange(value: any) {
  //   if (this.isValid(true)) {
  //     this.$emit('onChange', this.schema.id, value);
  //   }
  // }

  // public handleBlur(value: any) {
  //   if (this.isValid(true)) {
  //     this.$emit('onBlur', this.schema.id, value);
  //   }
  // }

  private created() {
    this.isDisabled = this.schema.isDisabled || false;
    this.isHidden = this.schema.isHidden || false;
    // console.log(this.schema as any);
  }
}
</script>
