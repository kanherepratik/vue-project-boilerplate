<template>
  <div class>
    <form-step-counter
      :containerList="tabbedContainerSchema.children"
      :activeContainerId="value"
      @stepClick="handleTabChange($event);"
    ></form-step-counter>
    <sub-container
      :schema="tabbedContainerSchema.children[activeContainerIndex]"
      :data="data"
      v-on="$listeners"
      :ref="tabbedContainerSchema.children[activeContainerIndex].id"
      :id="tabbedContainerSchema.children[activeContainerIndex].id"
      :key="tabbedContainerSchema.children[activeContainerIndex].id"
    />
    <app-button :title="tabbedContainerSchema.submitText || 'submit'" @click="handleSubmit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import SubContainer from './SubContainer.vue';
import { IContainerSchema, IWrapperComponentSchema, IWrapperComponent, IStepClickEvent } from '../shared/interfaces';
import { AppButton, RadioButton } from '@/common/components';
import { signals } from '../shared/signals';
import FormStepCounter from './FormStepCounter.vue';

@Component({
  components: {
    'sub-container': SubContainer,
    'app-button': AppButton,
    'form-step-counter': FormStepCounter,
  },
})
export default class FormTabbedContainer extends Vue {
  @Prop({ required: true }) private schema!: IContainerSchema;
  @Prop({ required: true }) private data!: any;
  @Prop(String) value!: string;
  private tabbedContainerSchema!: IContainerSchema;

  protected get activeContainerId(): string {
    return this.value;
  }
  protected set activeContainerId(activeContainerId: string) {
    this.$emit('input', activeContainerId);
  }

  public getFieldRef(fieldId: string): any {
    if (this.$refs[fieldId]) {
      return this.$refs[fieldId][0];
    } else {
      for (let item of this.tabbedContainerSchema.children) {
        if ((this.$refs[item.id] as any)[0].getFieldRef(fieldId)) {
          return (this.$refs[item.id] as any)[0].getFieldRef(fieldId);
        }
      }
    }
  }

  public get activeContainerIndex(): number {
    const index: number = this.tabbedContainerSchema.children.findIndex(
      (container: IContainerSchema) => container.id === this.activeContainerId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleContainerIndex === -1 ? 0 : this.firstVisibleContainerIndex;
    }
    return index;
  }

  public get firstVisibleContainerIndex(): number {
    const index: number = this.tabbedContainerSchema.children.findIndex(
      (container: IContainerSchema) => !container.isHidden
    );
    return index === -1 ? 0 : index;
  }

  public get lastVisibleContainerIndex(): number {
    const reverseContainers: IContainerSchema[] = [...this.tabbedContainerSchema.children].reverse();
    const reverseContainerIndex: number = reverseContainers.findIndex(
      (container: IContainerSchema) => !container.isHidden
    );
    return reverseContainerIndex === -1
      ? this.tabbedContainerSchema.children.length - 1
      : Math.abs(reverseContainerIndex - (this.tabbedContainerSchema.children.length - 1));
  }

  private get isPreviousVisible(): boolean {
    return this.firstVisibleContainerIndex > -1 && this.activeContainerIndex > this.firstVisibleContainerIndex;
  }

  private previousContainerIndex(formIndex: number): number {
    const reverseContainers: IContainerSchema[] = [...this.tabbedContainerSchema.children].reverse();
    const reverseContainerIndex: number = Math.abs(formIndex - (this.tabbedContainerSchema.children.length - 1));
    const reverseNextFormIndex: number = reverseContainers.findIndex(
      (container: IContainerSchema, index: number) => index > reverseContainerIndex && !container.isHidden
    );
    return reverseNextFormIndex === -1
      ? formIndex
      : Math.abs(reverseNextFormIndex - (this.tabbedContainerSchema.children.length - 1));
  }

  private setActiveContainer(activeContainerId: string): void {
    const index: number = this.tabbedContainerSchema.children.findIndex(
      (container: IContainerSchema) => container.id === activeContainerId && !container.isHidden
    );
    // Error message in case of invalid form id
    if (activeContainerId && index === -1) {
      console.error(
        'Form Id: "' +
          activeContainerId +
          '" cannot be active as it is either hidden or does not exist in the form tabbedContainerSchema'
      );
    }
    if (
      activeContainerId &&
      index > -1 &&
      (index === this.firstVisibleContainerIndex ||
        this.tabbedContainerSchema.children[index].isSubmitted ||
        this.tabbedContainerSchema.children[this.previousContainerIndex(index)].isSubmitted)
    ) {
      this.tabbedContainerSchema.children.forEach((container: IContainerSchema) => {
        container.isActive = false;
        if (container.id === activeContainerId) {
          container.isActive = true;
        }
      });
    } else {
      const incompleteFormIndex: number = this.tabbedContainerSchema.children.findIndex(
        (container: IContainerSchema) => !container.isSubmitted && !container.isHidden
      );
      // if (incompleteFormIndex > -1) {
      //   // Make first un-submitted and visible form active
      //   this.activeContainerId = this.tabbedContainerSchema.children[incompleteFormIndex].id;
      // } else {
      let activeIndex: number = this.tabbedContainerSchema.children.findIndex(
        (container: IContainerSchema) => container.isActive === true && !container.isHidden
      );
      if (activeIndex === -1) {
        // Make last submitted form active if all tabbedContainerSchema.children are submitted and no form is active
        activeIndex = this.lastVisibleContainerIndex;
      }
      this.activeContainerId = this.tabbedContainerSchema.children[activeIndex].id;
      // }
    }
  }
  private handleTabChange(event: IStepClickEvent): void {
    // Fired when a step on the `FormStepCounter` is clicked
    // @arg `:IStepClickEvent`<br/>Form properties of the form clicked on
    console.log('tab changed', event);
    this.setActiveContainer(event.containerId);
    this.$emit('tabChange', event);
  }

  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    return this.tabbedContainerSchema.children.every((component: IWrapperComponentSchema): boolean => {
      return (this.$refs[component.id] as any)[0].isValid();
    });
  }

  private handleSubmit(e: any): void {
    if (!this.isValid(true)) {
      return;
    }
    this.$emit(signals.ON_BEFORE_SUBMIT);
    // console.log('submit clicked', this.data);
    this.$emit(signals.ON_AFTER_SUBMIT, this.tabbedContainerSchema.id, this.data);
  }

  @Watch('schema')
  private onSchemaChange(newValue: IContainerSchema): void {
    this.tabbedContainerSchema = newValue;
  }

  private mounted(): void {}

  private created(): void {
    this.tabbedContainerSchema = this.$props.schema;
    // this.value = this.tabbedContainerSchema.children[0].id;
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