<template>
  <div class="box" v-if="!hidden">
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
import { ISubContainerSchema, IWrapperComponentSchema, IWrapperComponent } from '../interfaces/common';
import { signals } from '../signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
  },
})
export default class SubContainer extends Vue {
  @Prop({ required: true }) private schema!: ISubContainerSchema;
  @Prop({ required: true }) private data!: any;
  private isDisabled: boolean = false;
  private isHidden: boolean = false;

  private get hidden(): boolean {
    return this.isHidden;
  }

  private set hidden(value: boolean) {
    this.isHidden = value;
  }

  public showSubContainer(): void {
    this.hidden = false;
  }

  public hideSubContainer(): void {
    this.hidden = true;
  }

  public disableSubContainer(): void {
    this.schema.children.forEach((component: IWrapperComponentSchema): void => {
      (this.$refs[component.id] as any)[0].disableField();
    });
  }

  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    return this.schema.children.every((component: IWrapperComponentSchema): boolean => {
      return (this.$refs[component.id] as any)[0].isValid();
    });
  }

  public getFieldRef(fieldId: string): any {
    return this.$refs[fieldId][0];
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