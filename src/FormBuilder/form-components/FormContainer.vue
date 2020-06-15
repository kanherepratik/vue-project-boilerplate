<template>
  <div class="box">
    <div>{{ containerSchema.label }}</div>
    <div v-for="component in containerSchema.children" :key="component.id">
      <div v-if="component.children">
        <sub-container
          v-if="!component.isHidden"
          :key="component.id"
          :schema="component"
          :data="data"
          v-on="$listeners"
          :id="component.id"
          :ref="component.id"
        />
      </div>
      <div v-else>
        <wrapper-component
          :key="component.id"
          :schema="component"
          :data="data"
          v-on="$listeners"
          :ref="component.id"
        />
      </div>
    </div>
    <app-button :title="containerSchema.submitText || 'submit'" @click="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import SubContainer from './SubContainer.vue';
import { IContainerSchema, IWrapperComponentSchema, IWrapperComponent } from '../interfaces/common';
import { AppButton, RadioButton } from '@/common/components';
import { signals } from '../signals';

@Component({
  components: {
    'wrapper-component': WrapperComponent,
    'sub-container': SubContainer,
    'app-button': AppButton,
  },
})
export default class FormContainer extends Vue {
  @Prop({ required: true }) private schema!: IContainerSchema;
  @Prop({ required: true }) private data!: any;
  private containerSchema!: IContainerSchema;

  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    return this.schema.children.every((component: IWrapperComponentSchema): boolean => {
      // console.log(this.$refs[component.id]);
      return (this.$refs[component.id] as any)[0].isValid();
    });
  }

  public getFieldRef(fieldId: string): any {
    if (this.$refs[fieldId]) {
      return this.$refs[fieldId][0];
    } else {
      for (let item of this.containerSchema.children) {
        if ((this.$refs[item.id] as any)[0].getFieldRef(fieldId)) {
          return (this.$refs[item.id] as any)[0].getFieldRef(fieldId);
        }
      }
    }
  }

  private handleSubmit(e: any): void {
    if (!this.isValid(true)) {
      return;
    }
    this.$emit(signals.ON_BEFORE_SUBMIT);
    // console.log('submit clicked', this.data);
    this.$emit(signals.ON_AFTER_SUBMIT, this.schema.id, this.data);
  }

  @Watch('schema')
  private onSchemaChange(newValue: IContainerSchema): void {
    this.containerSchema = newValue;
  }

  private mounted(): void {}

  private created(): void {
    // console.log(this.schema);
    this.containerSchema = this.$props.schema;
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