<template>
  <div class="box">
    <div>{{ schema.label }}</div>
    <wrapper-component
      v-for="component in schema.children"
      :key="component.id"
      :schema="component"
      :data="data"
      v-on="$listeners"
      :ref="component.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import { ISubContainerSchema, IWrapperComponentSchema } from '../interfaces/common';
import { AppButton, RadioButton } from '@/common/components';
import { signals } from '../signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
    'app-button': AppButton,
  },
})
export default class SubContainer extends Vue {
  @Prop({ required: true }) private schema!: ISubContainerSchema;
  @Prop({ required: true }) private data!: any;

  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    return this.schema.children.every((component: IWrapperComponentSchema): boolean => {
      return (this.$refs[component.id] as any)[0].isValid();
    });
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