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
      >
        <template slot="stepNumber" slot-scope="slotProps">
          <slot
            name="stepNumber"
            v-bind:index="slotProps.index"
            v-bind:counter="slotProps.index + 1"
            v-bind:container="slotProps.container"
            v-bind:canNavigate="slotProps.canNavigate"
            v-bind:data="slotProps.data"
            v-bind:containerList="slotProps.containerList"
          >{{ slotProps.index + 1 }}</slot>
        </template>
        <template slot="stepLabel" slot-scope="slotProps">
          <slot
            name="stepLabel"
            v-bind:index="slotProps.index"
            v-bind:container="slotProps.container"
            v-bind:canNavigate="slotProps.canNavigate"
            v-bind:data="slotProps.data"
            v-bind:containerList="slotProps.containerList"
          >{{ slotProps.container.label }}</slot>
        </template>
      </form-step-counter>

      <form-container
        :key="formSchema[activeFormIndex].id"
        :schema="formSchema[activeFormIndex]"
        :data="formData"
        :ref="formSchema[activeFormIndex].id"
        :id="formSchema[activeFormIndex].id"
        v-on="$listeners"
        @onAfterSubmit="getDataOnSubmit"
      ></form-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue';
import { IWrapperComponent, IContainerSchema, IStepClickEvent } from './interfaces/common';
import { signals } from './signals';
import FormStepCounter from './form-components/FormStepCounter.vue';

@Component({
  components: {
    'form-container': FormContainer,
    'form-step-counter': FormStepCounter,
  },
})
export default class FormIndex extends Vue {
  @Prop({}) formSchema!: IContainerSchema[];
  @Prop({}) formData!: { [key: string]: any };
  @Prop(String) value!: string;
  @Prop({ type: Boolean, default: false }) private showNavigation!: boolean;

  //example for getting data on after submit from container
  private getDataOnSubmit(containerId: string, data: any): void {
    console.log('getData from index', data, containerId);
  }

  protected get activeFormId(): string {
    return this.value;
  }
  protected set activeFormId(activeFormId: string) {
    this.setActiveForm(activeFormId);
    this.$emit('input', activeFormId);
  }

  // public isValid = () => {
  //   return false;
  // };

  public getFieldRef(fieldId: string): IWrapperComponent | undefined {
    for (let container of this.formSchema) {
      if ((this.$refs[container.id] as any)[0].$refs[fieldId]) {
        return (this.$refs[container.id] as any)[0].$refs[fieldId][0];
      }
    }
  }

  public get activeFormIndex(): number {
    const index: number = this.formSchema.findIndex(
      (container: IContainerSchema) => container.id === this.activeFormId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleFormIndex === -1 ? 0 : this.firstVisibleFormIndex;
    }
    return index;
  }

  public get firstVisibleFormIndex(): number {
    const index: number = this.formSchema.findIndex((container: IContainerSchema) => !container.isHidden);
    return index === -1 ? 0 : index;
  }

  public get lastVisibleFormIndex(): number {
    const reverseContainers: IContainerSchema[] = [...this.formSchema].reverse();
    const reverseContainerIndex: number = reverseContainers.findIndex(
      (container: IContainerSchema) => !container.isHidden
    );
    return reverseContainerIndex === -1
      ? this.formSchema.length - 1
      : Math.abs(reverseContainerIndex - (this.formSchema.length - 1));
  }

  // private goToPreviousForm(): void {
  //   // Fired when `previous` navigation button is clicked
  //   // @arg `:INavigateClickEvent`<br/>Form properties of the previous form
  //   const previousIndex: number = this.previousFormIndex(this.activeFormIndex);
  //   if (previousIndex > -1 && previousIndex < this.activeFormIndex) {
  //     this.$emit('previousFormClick', {
  //       formId: this.forms[previousIndex].formId,
  //       formIndex: previousIndex,
  //     } as INavigateClickEvent);
  //   }
  // }
  private get isPreviousVisible(): boolean {
    return this.firstVisibleFormIndex > -1 && this.activeFormIndex > this.firstVisibleFormIndex;
  }

  private previousFormIndex(formIndex: number): number {
    const reverseContainers: IContainerSchema[] = [...this.formSchema].reverse();
    const reverseContainerIndex: number = Math.abs(formIndex - (this.formSchema.length - 1));
    const reverseNextFormIndex: number = reverseContainers.findIndex(
      (container: IContainerSchema, index: number) => index > reverseContainerIndex && !container.isHidden
    );
    return reverseNextFormIndex === -1 ? formIndex : Math.abs(reverseNextFormIndex - (this.formSchema.length - 1));
  }
  s;

  private setActiveForm(activeFormId: string): void {
    const index: number = this.formSchema.findIndex(
      (container: IContainerSchema) => container.id === activeFormId && !container.isHidden
    );
    // Error message in case of invalid form id
    if (activeFormId && index === -1) {
      console.error(
        'Form Id: "' + activeFormId + '" cannot be active as it is either hidden or does not exist in the form schema'
      );
    }
    if (
      activeFormId &&
      index > -1 &&
      (index === this.firstVisibleFormIndex ||
        this.formSchema[index].isSubmitted ||
        this.formSchema[this.previousFormIndex(index)].isSubmitted)
    ) {
      this.formSchema.forEach((container: IContainerSchema) => {
        container.isActive = false;
        if (container.id === activeFormId) {
          container.isActive = true;
        }
      });
    } else {
      const incompleteFormIndex: number = this.formSchema.findIndex(
        (container: IContainerSchema) => !container.isSubmitted && !container.isHidden
      );
      if (incompleteFormIndex > -1) {
        // Make first un-submitted and visible form active
        this.activeFormId = this.formSchema[incompleteFormIndex].id;
      } else {
        let activeIndex: number = this.formSchema.findIndex(
          (container: IContainerSchema) => container.isActive === true && !container.isHidden
        );
        if (activeIndex === -1) {
          // Make last submitted form active if all formSchema are submitted and no form is active
          activeIndex = this.lastVisibleFormIndex;
        }
        this.activeFormId = this.formSchema[activeIndex].id;
      }
    }
  }
  private onStepClick(event: IStepClickEvent): void {
    // Fired when a step on the `FormStepCounter` is clicked
    // @arg `:IStepClickEvent`<br/>Form properties of the form clicked on
    console.log('step clicked', event);
    // FIXME: this will be handled from parent, need to fix this
    this.setActiveForm(event.containerId);
    this.$emit('stepClick', event);
  }

  // @Watch('value')
  // private onValueChange(newValue: string): void {
  //   debugger;
  //   this.setActiveForm(newValue);
  // }
}
</script>