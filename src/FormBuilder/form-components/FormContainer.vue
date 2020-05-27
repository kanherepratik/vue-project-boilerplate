<template>
  <div class="box">
    <div>{{ schema.label }}</div>
    <wrapper-component
      v-for="component in schema.children"
      :key="component.id"
      :schema="component"
      :data="data"
      :ref="component.id"
      :id="component.id"
    />

    <app-button :title="schema.submitText || 'submit'" @click="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import { IContainerSchema, IWrapperComponentSchema } from '../interfaces/common';
import { AppButton, RadioButton } from '@/common/components';
import { signals } from '../signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
    'app-button': AppButton,
  },
})
export default class FormContainer extends Vue {
  @Prop({ required: true }) private schema!: IContainerSchema;
  @Prop({ required: true }) private data!: any;

  public isValid(showError: boolean = false): boolean {
    // TODO: check why AppButton is getting validated here
    return this.schema.children.every((component: IWrapperComponentSchema): boolean => {
      // console.log((this.$refs[component.id] as any)[0].isValid());
      return (this.$refs[component.id] as any)[0].isValid();
    });
    // this.schema.children.forEach((component: IWrapperComponentSchema): boolean => {
    //   // console.log((this.$refs[component.id] as any)[0].isValid());
    //   return (this.$refs[component.id] as any)[0].isValid();
    // });
  }

  private handleSubmit(e: any): void {
    if (!this.isValid(true)) {
      return;
    }
    this.$emit(signals.ON_BEFORE_SUBMIT);
    console.log('submit clicked', this.data);
    this.$emit(signals.ON_AFTER_SUBMIT, this.schema.id, this.data);
  }

  private created(): void {
    this.$emit(signals.ON_CONTAINER_LOAD);
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