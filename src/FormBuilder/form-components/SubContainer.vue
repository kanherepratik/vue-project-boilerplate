<template>
  <div class="box" v-if="!isHidden">
    <div>{{ schema.label }}</div>
    <wrapper-component
      v-for="component in schema.children"
      :key="component.id"
      :schema="component"
      :data="data"
      v-on="$listeners"
      :ref="component.id"
      :componentMap="componentMap"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import { ISubContainerSchema, IWrapperComponentSchema, IComponentMap } from '../shared/interfaces';
import { signals } from '../shared/signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
  },
})
export default class SubContainer extends Vue {
  /**
   * the schema object which will render WrapperComponent.
   */
  @Prop({ required: true }) private schema!: ISubContainerSchema;
  /**
   * the data object with keys as fieldId and value bound to v-model of component.
   */
  @Prop({ required: true }) private data!: any;
  /**
   * Mapping for form-components
   */
  @Prop(Object) private componentMap!: { [key: string]: IComponentMap };
  /**
   * Maping for signal callbacks
   */
  @Prop(Object) private signal!: { [key: string]: () => boolean };
  private isDisabled: boolean = false;
  private isHidden: boolean = false;

  private created(): void {
    this.signal?.[signals.ON_CONTAINER_LOAD]?.();
  }
  /**
   * Gets called when parent wants to show a hidden subContainer
   * @public
   */
  public showSubContainer(): void {
    this.isHidden = false;
  }
  /**
   * Gets called when parent wants to hide a subContainer
   * @public
   */
  public hideSubContainer(): void {
    this.isHidden = true;
  }

  /**
   * Gets called when parent wants to disable all the fields of a subContainer
   * @public
   */
  public disableSubContainer(): void {
    this.schema.children.forEach((component: IWrapperComponentSchema): void => {
      (this.$refs[component.id] as any)[0].disableField();
    });
  }

  /**
   * Gets called when parent wants to validate the component
   * @param {boolean} showError
   * @returns {boolean}
   * @public
   */
  public isValid(showError: boolean = false): boolean {
    if (!this.signal?.[signals.ON_BEFORE_VALIDATE]?.()) {
      return false;
    }

    let isValid = true;
    // It will hold the boolean flag of each component
    const isValidList: boolean[] = [];
    this.schema.children.forEach((component: IWrapperComponentSchema): void => {
      isValidList.push((this.$refs[component.id] as any)[0].isValid(showError));
      // If any of the component is not valid (isValid == false) then assign false to isValid
      isValid = !isValidList.includes(false);
    });
    return isValid;
  }

  /**
   * Gets called when parent wants to access ref of the components.
   * It will return ref of wrapperComponent
   * @param {string} fieldId
   * @returns {any}
   * @public
   */
  public getFieldRef(fieldId: string): any {
    for (let component of this.schema.children) {
      if (this.$refs[fieldId] && component.id === fieldId) {
        return this.$refs[fieldId][0];
      }
    }
  }
}
</script>

<style scoped>
.box {
  border: 1px solid;
  margin-bottom: 20px;
  padding: 20px;
}
</style
>>
