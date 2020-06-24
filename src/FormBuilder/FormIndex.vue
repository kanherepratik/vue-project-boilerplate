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
          :activeContainerId="activeContainerId"
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
import FormSummary from './form-components/FormSummary.vue';
import { FormMode, ContainerType } from './shared/enums';
import {
  getFirstVisibleContainerIndex,
  getLastVisibleContainerIndex,
  getPreviousContainerIndex,
  getActiveContainerIndex,
} from './shared/utils';

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
   * Mapping for form-components
   */
  @Prop(Object) private componentMap!: { [key: string]: IComponentMap };
  /**
   * Maping for signal callbacks
   */
  @Prop(Object) private signal!: { [key: string]: () => boolean };

  private activeStep: string = '';
  private activeTab: string = '';
  private mode: FormMode = FormMode.Edit;
  private FormMode: typeof FormMode = FormMode;

  /**
   * getters methods starts
   */
  private get activeContainerId(): string {
    return this.activeStep;
  }
  private set activeContainerId(activeContainerId: string) {
    this.activeStep = activeContainerId;
  }

  private get activeContainerIndex(): number {
    const index = getActiveContainerIndex(this.formSchema, this.activeContainerId);
    if (index === -1) {
      return this.firstVisibleContainerIndex === -1 ? 0 : this.firstVisibleContainerIndex;
    }
    return index;
  }

  private get activeTabIndex(): number {
    const index = this.formSchema[this.activeContainerIndex].children.findIndex(
      (subContainer) => (subContainer as ISubContainerSchema).id === this.activeTab
    );

    if (index === -1) {
      return 0;
    }
    return index;
  }

  private get firstVisibleContainerIndex(): number {
    return getFirstVisibleContainerIndex(this.formSchema);
  }

  private get lastVisibleContainerIndex(): number {
    return getLastVisibleContainerIndex(this.formSchema);
  }

  private get isPreviousVisible(): boolean {
    return this.firstVisibleContainerIndex > -1 && this.activeContainerIndex > this.firstVisibleContainerIndex;
  }

  private get allFormsSubmitted(): boolean {
    return this.formSchema.findIndex((container) => !container.isSubmitted) === -1;
  }

  /**
   * getters methods ends
   */

  private previousContainerIndex(formIndex: number): number {
    return getPreviousContainerIndex(this.formSchema, formIndex);
  }
  /**
   * This method handles the steps change and make the container active.
   */
  private setActiveContainer(activeContainerId: string): void {
    const index = getActiveContainerIndex(this.formSchema, activeContainerId);
    // Error message in case of invalid form id
    if (index === -1) {
      console.error(
        'Form Id: "' +
          activeContainerId +
          '" cannot be active as it is either hidden or does not exist in the form schema'
      );
    }
    // check if previous form is submitted then make the current form active.
    // If it is the first form make it active.
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
          this.activeContainerId = container.id;
        }
      });
    } else {
      // Todo: check if the else part is really needed or not!!
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

  /**
   * This method takes care of container isActive and isSubmitted on submit.
   */
  private setNextActive(containerId: string, isTab: boolean = false): void {
    const activeFormIndex = this.formSchema.findIndex((container) => containerId === container.id);
    const activeForm = this.formSchema[activeFormIndex];

    // Check if its a tabbed container
    if (isTab) {
      (activeForm.children[this.activeTabIndex] as ISubContainerSchema).isSubmitted = true;
      (activeForm.children[this.activeTabIndex] as ISubContainerSchema).isActive = false;
      if (this.activeTabIndex !== activeForm.children.length - 1) {
        (activeForm.children[this.activeTabIndex + 1] as ISubContainerSchema).isActive = true;
        this.activeTab = (activeForm.children[this.activeTabIndex + 1] as ISubContainerSchema).id;
        return;
      }
    }
    // if its the last tab then simply mark submitted
    activeForm.isSubmitted = true;
    if (activeFormIndex === this.formSchema.length - 1) {
      this.formSchema[activeFormIndex].isActive = false;
      this.mode = FormMode.Review;
    } else {
      // set next container's isActive to true in formSchema
      this.setActiveContainer(this.formSchema[activeFormIndex + 1].id);
    }
  }

  /**
   * event handlers methods
   */

  private onStepClick(event: IStepClickEvent): void {
    if (event.canNavigate) {
      this.setActiveContainer(event.containerId);
    }
    /**
     * Fired when a step is clicked.
     * @param {IStepClickEvent} event
     */

    this.$emit('stepClick', event);
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
    this.setActiveContainer(containerId);
    // reset active tab on edit
    this.activeTab = this.formSchema[this.activeContainerIndex]?.children[0].id;
  }

  private async handleSubmit(containerId: string): Promise<void> {
    const isSubmitSuccess = await this.signal?.[signals.ON_SUBMIT]?.();
    const activeFormIndex = this.formSchema.findIndex((container) => containerId === container.id);
    const activeForm = this.formSchema[activeFormIndex];
    if (!isSubmitSuccess) {
      activeForm.isSubmitted = false;
      return;
    }
    this.setNextActive(activeForm.id, activeForm.component === ContainerType.TabbedContainer);
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
