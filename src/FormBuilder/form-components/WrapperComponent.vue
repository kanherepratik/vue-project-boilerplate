<template>
  <div>
    <component
      :is="componentMap[schema.component].component"
      v-if="!isHidden"
      :disabled="isDisabled"
      v-on="massagedEventMap"
      v-model="data[schema.id]"
      v-bind="schema.otherProps"
      :ref="schema.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { IWrapperComponentSchema, IComponentMap, IEventMap } from '../shared/interfaces';
import componentMap from '../config/componentMap';

@Component
export default class WrapperComponent extends Vue {
  /**
   * The schema object which will be used to render a dynamic component
   */
  @Prop({ type: Object, required: true }) private schema!: IWrapperComponentSchema;
  /**
   * value holds the v-model property of wrapperComponent which is then bound to component v-model.
   * It is a key of data object
   */
  @Prop({ required: true }) private data!: any;
  private componentMap: { [key: string]: IComponentMap } = componentMap;
  private isDisabled: boolean = false;
  private isHidden: boolean = false;
  private eventMap: IEventMap = {};

  private created() {
    this.isDisabled = this.schema.isDisabled || false;
    this.isHidden = this.schema.isHidden || false;
  }

  private get massagedEventMap(): IEventMap {
    for (let event of this.componentMap[this.schema.component].eventMap) {
      this.eventMap[event] = this.handleEvent;
    }
    return this.eventMap;
  }

  private handleEvent(value: any, event: any): void {
    /**
     * This will emit an event on any change/blur/click etc. of component
     * @param {string} eventType
     * @param {string} fieldId
     * @param {any} value
     */
    this.$emit('emit', event.type, this.schema.id, value);
  }

  /* exposed methods of WrapperComponent */
  /**
   * Gets called when parent wants to validate the component
   * @param {boolean} showError
   * @public
   */
  public isValid = (showError: boolean = false): boolean => {
    return (this.$refs[this.schema.id] as any) ? (this.$refs[this.schema.id] as any).isValid(showError) : true;
  };

  /**
   * Gets called when parent wants the `ref` of the component.
   * @public
   */
  public getFieldRef(): any {
    return (this.$refs as any)[this.schema.id];
  }

  /**
   * Gets called when parent wants to show field which is already hidden.
   * @public
   */
  public showField(): void {
    this.isHidden = false;
  }
  /**
   * Gets called when parent wants to hide field.
   * @public
   */
  public hideField(): void {
    this.isHidden = true;
  }
  /**
   * Gets called when parent wants to disable field.
   * @public
   */
  public disableField(): void {
    this.isDisabled = true;
  }
  /**
   * Gets called when parent wants to enable field.
   * @public
   */
  public enableField(): void {
    this.isDisabled = false;
  }
  /* exposed methods of WrapperComponent till here */
}
</script>
