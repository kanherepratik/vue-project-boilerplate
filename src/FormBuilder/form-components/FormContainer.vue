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
          v-on="$listeners"
          :id="componentSchema.id"
          :ref="componentSchema.id"
        />
      </div>
      <div v-else>
        <wrapper-component
          :key="componentSchema.id"
          :schema="componentSchema"
          v-model="data[componentSchema.id]"
          v-on="$listeners"
          :ref="componentSchema.id"
        />
      </div>
    </div>
    <slot name="formButtons">
      <app-button :title="schema.submitText || 'submit'" @click="handleSubmit" />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import SubContainer from './SubContainer.vue';
import { IContainerSchema, IWrapperComponentSchema, IContainerComponentParentSchema } from '../shared/interfaces';
import { signals } from '../shared/signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
    'sub-container': SubContainer,
  },
})
export default class FormContainer extends Vue {
  @Prop({ required: true }) private schema!: IContainerSchema;
  @Prop({ required: true }) private data!: any;

  private created(): void {
    this.$emit(signals.ON_CONTAINER_LOAD);
  }

  private handleSubmit(): void {
    if (!this.isValid(true)) {
      return;
    }
    this.$emit(signals.ON_BEFORE_SUBMIT);
    this.$emit(signals.ON_AFTER_SUBMIT, this.schema.id, this.data);
  }

  /**
   * Gets called to validate the component
   * @param {boolean} showError
   * @returns {boolean}
   * @public
   */
  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    return this.schema.children.every((component: IContainerComponentParentSchema): boolean => {
      return (this.$refs[component.id] as any)[0].isValid(showError);
    });
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
</style>>