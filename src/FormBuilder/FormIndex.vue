<template>
  <div>
    <div v-if="!formSchema.length">
      <spinner-component />
    </div>
    <div v-else>
      <div v-if="allFormsSubmitted && mode === FormMode.Review">
        <form-summary :formSchema="formSchema" :formData="formData" @edit="onSummaryEdit" />
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
          :componentMap="componentMap"
          :signal="signal"
          v-model="activeTab"
          @tabChange="handleTabChange"
          @emit="handleContainerEmit"
          @submit="handleSubmit"
        />
        <form-container
          v-else
          :schema="formSchema[activeContainerIndex]"
          :data="formData"
          :ref="formSchema[activeContainerIndex].id"
          :id="formSchema[activeContainerIndex].id"
          :componentMap="componentMap"
          :signal="signal"
          @emit="handleContainerEmit"
          @submit="handleSubmit"
        ></form-container>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Model } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue';
import FormStepCounter from './form-components/FormStepCounter.vue';
import FormTabbedContainer from './form-components/FormTabbedContainer.vue';
import { IContainerSchema, IStepClickEvent, IComponentMap, ISubContainerSchema } from './shared/interfaces';
import { signals } from './shared/signals';
import FormSummary from './FormSummary.vue';
import { FormMode, ContainerType } from './shared/enums';

@Component({
  components: {
    'form-container': FormContainer,
    'form-step-counter': FormStepCounter,
    'form-tabbed-container': FormTabbedContainer,
    'form-summary': FormSummary,
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

  @Prop(Object) private componentMap!: { [key: string]: IComponentMap };

  @Prop(Object) private signal!: { [key: string]: () => boolean };

  private activeTab: string = '';
  private mode: FormMode = FormMode.Edit;
  private FormMode: typeof FormMode = FormMode;

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

  private get allFormsSubmitted(): boolean {
    return this.formSchema.findIndex((container) => !container.isSubmitted) === -1;
  }

  private get activeTabId(): string {
    const containerObj = this.formSchema[this.activeContainerIndex];
    let activeId = '';
    if (containerObj.component === ContainerType.TabbedContainer) {
      const activeTabContainer = containerObj.children.find((component) => (component as ISubContainerSchema).isActive);
      activeId = activeTabContainer ? activeTabContainer.id : containerObj.children[0].id;
    }
    return activeId;
  }

  private set activeTabId(tabId: string) {
    this.activeTab = tabId;
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
    this.setActiveContainer(event.containerId);
    /**
     * Fired when a step is clicked.
     * @param {IStepClickEvent} event
     */

    this.$emit('stepClick', event);
  }

  private handleTabChange(event: IStepClickEvent): void {
    this.activeTabId = event.containerId;
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

  private onSummaryEdit(containerId: string): void {
    this.mode = FormMode.Edit;
    this.activeContainerId = containerId;
  }

  private handleSubmit(containerId: string): void {
    const activeFormIndex = this.formSchema.findIndex((container) => containerId === container.id);
    const activeForm = this.formSchema[activeFormIndex];

    if (activeForm.component === ContainerType.TabbedContainer) {
      const activeTabIndex = activeForm.children.findIndex(
        (subContainer) => (subContainer as ISubContainerSchema).isActive
      );
      if (activeTabIndex !== activeForm.children.length - 1) {
        (activeForm.children[activeTabIndex] as ISubContainerSchema).isActive = false;
        this.activeTabId = activeForm.children[activeTabIndex + 1].id;
        (activeForm.children[activeTabIndex + 1] as ISubContainerSchema).isActive = true;
        return;
      }
    }
    this.$emit('submit', containerId);
    if (activeFormIndex === this.formSchema.length - 1) {
      this.mode = FormMode.Review;
    }
  }

  /**
   * Gets called when parent wants to access ref of the components.
   * It will return ref of wrapperComponent/subContainer
   * @param {string} fieldId
   * @returns {any}
   * @public
   */
  public getFieldRef(fieldId: string): any {
    for (let container of this.formSchema) {
      if (this.$refs[container.id]) {
        return (this.$refs[container.id] as any).getFieldRef(fieldId);
      }
    }
  }
}
</script>
