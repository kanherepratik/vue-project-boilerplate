<template>
  <div class="box" v-if="!isHidden">
    <div>{{ schema.label }}</div>
    <wrapper-component
      v-for="component in schema.children"
      :key="component.id"
      :schema="component"
      v-model="data[component.id]"
      v-on="$listeners"
      :ref="component.id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import WrapperComponent from './WrapperComponent.vue';
import { ISubContainerSchema, IWrapperComponentSchema, IWrapperComponent } from '../shared/interfaces';
import { signals } from '../shared/signals';

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

  // private get hidden(): boolean {
  //   return this.isHidden;
  // }

  // private set hidden(value: boolean) {
  //   this.isHidden = value;
  // }

  public showSubContainer(): void {
    this.isHidden = false;
  }

  public hideSubContainer(): void {
    this.isHidden = true;
  }

  public disableSubContainer(): void {
    this.schema.children.forEach((component: IWrapperComponentSchema): void => {
      (this.$refs[component.id] as any)[0].disableField();
    });
  }

  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    return this.schema.children.every((component: IWrapperComponentSchema): boolean => {
      return (this.$refs[component.id] as any)[0].isValid(showError);
    });
  }

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
</style>>