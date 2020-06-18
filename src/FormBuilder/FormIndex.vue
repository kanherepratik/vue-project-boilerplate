<template>
  <div>
    <div v-if="!formSchema.length">
      <spinner-component />
    </div>
    <div v-else>
      <form-step-counter
        :containerList="formSchema"
        :data="formData"
        :activeContainerId="activeStep"
        @stepClick="onStepClick($event)"
      >
        <template slot="stepNumber" slot-scope="slotProps">{{ slotProps.index + 1 }}</template>
      </form-step-counter>
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
import { Component, Vue, Prop, Watch, Model } from 'vue-property-decorator';
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
  /**
   * the schema which will render container/tabbedContainer.
   */
  @Prop({ default: () => [] }) formSchema!: IContainerSchema[];
  /**
   * the data object with keys as fieldId and value bound to v-model of component.
   * It is passed down to container and subContainer.
   * Used to prefill the fields with user data.
   */
  @Prop({}) formData!: { [key: string]: any };
  /**
   * flag to show/hide navigation buttons.
   */
  @Prop({ type: Boolean, default: false }) private showNavigation!: boolean;
  /**
   * Model for activeStep. It is bound via v-model
   */
  @Model('change', { type: String }) readonly activeStep;
  private activeTab: string = '';

  private getDataOnSubmit(containerId: string, data: any): void {
    console.log('getData from index', data, containerId);
  }

  private get activeContainerId(): string {
    return this.activeStep;
  }
  private set activeContainerId(activeContainerId: string) {
    this.$emit('change', activeContainerId);
  }

  private get activeContainerIndex(): number {
    const index: number = this.formSchema.findIndex(
      (container: IContainerSchema) => container.id === this.activeContainerId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleContainerIndex === -1 ? 0 : this.firstVisibleContainerIndex;
    }
    return index;
  }

  private get firstVisibleContainerIndex(): number {
    const index: number = this.formSchema.findIndex((container: IContainerSchema) => !container.isHidden);
    return index === -1 ? 0 : index;
  }

  private get lastVisibleContainerIndex(): number {
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
    this.activeContainerId = event.containerId;
    /**
     * Fired when a step is clicked.
     * @param {IStepClickEvent} event
     */
    this.$emit('stepClick', event);
  }

  private handleTabChange(event: IStepClickEvent): void {
    this.activeTab = event.containerId;
  }
  private handleContainerEmit(eventName: string, fieldId: string, value?: any): void {
    /**
     * This will emit an event on any change/blur/click etc. of component
     * @param {string} eventType
     * @param {string} fieldId
     * @param {any} value
     */
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
