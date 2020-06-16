<template>
  <div>
    <div v-if="!formSchema.length">
      <spinner-component />
    </div>
    <div v-else>
      <form-step-counter
        :containerList="formSchema"
        :data="formData"
        :activeContainerId="value"
        @stepClick="onStepClick($event);"
      ></form-step-counter>
      <form-tabbed-container
        v-if="formSchema[activeContainerIndex].component === 'TabbedContainer'"
        :schema="formSchema[activeContainerIndex]"
        :data="formData"
        :ref="formSchema[activeContainerIndex].id"
        :id="formSchema[activeContainerIndex].id"
        v-model="activeTab"
        @tabChange="handleTabChange"
        @emit="handleContainerEmit"
        @onAfterSubmit="getDataOnSubmit"
      />
      <form-container
        v-else
        :schema="formSchema[activeContainerIndex]"
        :data="formData"
        :ref="formSchema[activeContainerIndex].id"
        :id="formSchema[activeContainerIndex].id"
        @emit="handleContainerEmit"
        @onAfterSubmit="getDataOnSubmit"
      ></form-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue';
import FormStepCounter from './form-components/FormStepCounter.vue';
import FormTabbedContainer from './form-components/FormTabbedContainer.vue';
import { IContainerSchema, IStepClickEvent } from './shared/interfaces';
import { signals } from './shared/signals';

@Component({
  components: {
    'form-container': FormContainer,
    'form-step-counter': FormStepCounter,
    'form-tabbed-container': FormTabbedContainer,
  },
})
export default class FormIndex extends Vue {
  @Prop({}) formSchema!: IContainerSchema[];
  @Prop({}) formData!: { [key: string]: any };
  @Prop(String) value!: string;
  @Prop({ type: Boolean, default: false }) private showNavigation!: boolean;
  private activeTab: string = '';

  //example for getting data on after submit from container
  private getDataOnSubmit(containerId: string, data: any): void {
    console.log('getData from index', data, containerId);
  }

  protected get activeContainerId(): string {
    return this.value;
  }
  protected set activeContainerId(activeContainerId: string) {
    this.$emit('input', activeContainerId);
  }

  // public isValid = () => {
  //   return false;
  // };

  public get activeContainerIndex(): number {
    const index: number = this.formSchema.findIndex(
      (container: IContainerSchema) => container.id === this.activeContainerId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleContainerIndex === -1 ? 0 : this.firstVisibleContainerIndex;
    }
    return index;
  }

  public get firstVisibleContainerIndex(): number {
    const index: number = this.formSchema.findIndex((container: IContainerSchema) => !container.isHidden);
    return index === -1 ? 0 : index;
  }

  public get lastVisibleContainerIndex(): number {
    const reverseContainers: IContainerSchema[] = [...this.formSchema].reverse();
    const reverseContainerIndex: number = reverseContainers.findIndex(
      (container: IContainerSchema) => !container.isHidden
    );
    return reverseContainerIndex === -1
      ? this.formSchema.length - 1
      : Math.abs(reverseContainerIndex - (this.formSchema.length - 1));
  }

  private get isPreviousVisible(): boolean {
    return this.firstVisibleContainerIndex > -1 && this.activeContainerIndex > this.firstVisibleContainerIndex;
  }

  private previousContainerIndex(formIndex: number): number {
    const reverseContainers: IContainerSchema[] = [...this.formSchema].reverse();
    const reverseContainerIndex: number = Math.abs(formIndex - (this.formSchema.length - 1));
    const reverseNextFormIndex: number = reverseContainers.findIndex(
      (container: IContainerSchema, index: number) => index > reverseContainerIndex && !container.isHidden
    );
    return reverseNextFormIndex === -1 ? formIndex : Math.abs(reverseNextFormIndex - (this.formSchema.length - 1));
  }
  s;

  private setActiveContainer(activeContainerId: string): void {
    const index: number = this.formSchema.findIndex(
      (container: IContainerSchema) => container.id === activeContainerId && !container.isHidden
    );
    // Error message in case of invalid form id
    if (activeContainerId && index === -1) {
      console.error(
        'Form Id: "' +
          activeContainerId +
          '" cannot be active as it is either hidden or does not exist in the form schema'
      );
    }
    if (
      activeContainerId &&
      index > -1 &&
      (index === this.firstVisibleContainerIndex ||
        this.formSchema[index].isSubmitted ||
        this.formSchema[this.previousContainerIndex(index)].isSubmitted)
    ) {
      this.formSchema.forEach((container: IContainerSchema) => {
        container.isActive = false;
        if (container.id === activeContainerId) {
          container.isActive = true;
        }
      });
    } else {
      const incompleteFormIndex: number = this.formSchema.findIndex(
        (container: IContainerSchema) => !container.isSubmitted && !container.isHidden
      );
      if (incompleteFormIndex > -1) {
        // Make first un-submitted and visible form active
        this.activeContainerId = this.formSchema[incompleteFormIndex].id;
      } else {
        let activeIndex: number = this.formSchema.findIndex(
          (container: IContainerSchema) => container.isActive === true && !container.isHidden
        );
        if (activeIndex === -1) {
          // Make last submitted form active if all formSchema are submitted and no form is active
          activeIndex = this.lastVisibleContainerIndex;
        }
        this.activeContainerId = this.formSchema[activeIndex].id;
      }
    }
  }
  private onStepClick(event: IStepClickEvent): void {
    // Fired when a step on the `FormStepCounter` is clicked
    // @arg `:IStepClickEvent`<br/>Form properties of the form clicked on
    console.log('step clicked', event);
    this.activeContainerId = event.containerId;
    this.$emit('stepClick', event);
  }

  private handleTabChange(event: IStepClickEvent): void {
    this.activeTab = event.containerId;
  }
  private handleContainerEmit(eventName: string, fieldId: string, value?: any): void {
    this.$emit('emit', eventName, fieldId, value);
  }

  public getFieldRef(fieldId: string): any {
    for (let container of this.formSchema) {
      if (this.$refs[container.id]) {
        return (this.$refs[container.id] as any).getFieldRef(fieldId);
      }
    }
  }
}
</script>