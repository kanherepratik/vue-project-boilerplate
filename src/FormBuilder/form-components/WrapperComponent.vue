<template>
  <div>
    <component
      :is="componentMap[schema.component].component"
      v-if="!isHidden"
      :disabled="isDisabled"
      v-on="massagedEventMap"
      v-model="valueInput"
      v-bind="schema.otherProps"
      :ref="schema.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { IWrapperComponentSchema, IComponentMap, IWrapperComponent, IEventMap } from '../shared/interfaces';
import componentMap from '../config/componentMap';

@Component
export default class WrapperComponent extends Vue {
  @Prop({ type: Object, required: true }) private schema!: IWrapperComponentSchema;
  @Prop({ required: true }) private value!: unknown;
  private componentMap: IComponentMap = componentMap;
  private isDisabled: boolean = false;
  private isHidden: boolean = false;
  private valueInput!: unknown;
  private eventMap: IEventMap = {};

  private created() {
    this.isDisabled = this.schema.isDisabled || false;
    this.isHidden = this.schema.isHidden || false;
    this.valueInput = this.$props.value;
  }

  private get massagedEventMap(): IEventMap {
    for (let event of componentMap[this.schema.component].eventMap) {
      this.eventMap[event] = this.handleEvent;
    }
    return this.eventMap;
  }

  /* exposed methods of WrapperComponent */
  public isValid = (showError: boolean = false): boolean => {
    return (this.$refs[this.schema.id] as any).isValid(showError);
  };

  public getValue(): any {
    return this.valueInput;
  }

  public getFieldRef(): IWrapperComponent {
    return (this.$refs as any)[this.schema.id];
  }

  public showField(): void {
    this.isHidden = false;
  }

  public hideField(): void {
    this.isHidden = true;
  }

  public disableField(): void {
    this.isDisabled = true;
  }

  public enableField(): void {
    this.isDisabled = false;
  }
  /* exposed methods of WrapperComponent till here */

  @Watch('value')
  private onValueChange(newValue: unknown): void {
    this.valueInput = newValue;
  }

  private handleEvent(value: any, event: any): void {
    this.$emit('emit', event.type, this.schema.id, value);
  }
}
</script>
