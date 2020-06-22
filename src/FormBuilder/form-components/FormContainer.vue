<template>
  <div class="box">
    <div>{{ schema.label }}</div>
    <div v-for="componentSchema in schema.children" :key="componentSchema.id">
      <div v-if="componentSchema['children']">
        <sub-container
          v-if="!componentSchema.isHidden"
          :key="componentSchema.id"
          :schema="componentSchema"
          :data="data"
          :signal="signal"
          v-on="$listeners"
          :id="componentSchema.id"
          :ref="componentSchema.id"
          :componentMap="componentMap"
        />
      </div>
      <div v-else>
        <wrapper-component
          :key="componentSchema.id"
          :schema="componentSchema"
          :data="data"
          v-on="$listeners"
          :ref="componentSchema.id"
          :componentMap="componentMap"
        />
      </div>
    </div>
    <!--
  	  @slot Form buttons slot
    -->
    <slot name="formButtons">
      <app-button :title="schema.submitText || 'submit'" @click="handleSubmit" />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import SubContainer from './SubContainer.vue';
import {
  IContainerSchema,
  IWrapperComponentSchema,
  IContainerComponentParentSchema,
  IComponentMap,
} from '../shared/interfaces';
import { signals } from '../shared/signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
    'sub-container': SubContainer,
  },
})
export default class FormContainer extends Vue {
  /**
   * the form schema which will render WrapperComponent or subContainer.
   */
  @Prop({ required: true }) private schema!: IContainerSchema;
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

  private created(): void {
    this.signal?.[signals.ON_CONTAINER_LOAD]?.();
  }

  private handleSubmit(): void {
    if (!this.isValid(true)) {
      return;
    }
    this.$emit('submit', this.schema.id);
  }

  /**
   * Gets called to check validity of the child components
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
    this.schema.children.forEach((component: IContainerComponentParentSchema): void => {
      isValidList.push((this.$refs[component.id] as any)[0].isValid(showError));
      // If any of the component is not valid (isValid == false) then assign false to isValid
      isValid = !isValidList.includes(false);
    });
    return isValid;
  }

  /**
   * Gets called when parent wants to access ref of the components.
   * It will return ref of wrapperComponent/subContainer
   * @param {string} fieldId
   * @returns {any}
   * @public
   */
  public getFieldRef(fieldId: string): any {
    if (this.$refs[fieldId]) {
      return this.$refs[fieldId][0];
    } else {
      for (let item of this.schema.children) {
        if ((this.$refs[item.id] as any)[0].getFieldRef(fieldId)) {
          return (this.$refs[item.id] as any)[0].getFieldRef(fieldId);
        }
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
