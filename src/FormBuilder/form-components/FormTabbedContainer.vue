<template>
  <div class>
    <form-step-counter
      :containerList="schema.children"
      :activeContainerId="activeContainerId"
      @stepClick="handleTabChange($event)"
    ></form-step-counter>
    <sub-container
      :schema="schema.children[activeContainerIndex]"
      :data="data"
      v-on="$listeners"
      :ref="schema.children[activeContainerIndex].id"
      :id="schema.children[activeContainerIndex].id"
      :key="schema.children[activeContainerIndex].id"
    />
    <!--
  	  @slot Form buttons slot
    -->
    <slot name="formButtons">
      <app-button :title="schema.submitText || 'submit'" @click="handleSubmit" />
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import SubContainer from './SubContainer.vue';
import {
  IContainerSchema,
  IStepClickEvent,
  ISubContainerSchema,
  IContainerComponentParentSchema,
} from '../shared/interfaces';
import { signals } from '../shared/signals';
import FormStepCounter from './FormStepCounter.vue';

@Component({
  components: {
    'sub-container': SubContainer,
    'form-step-counter': FormStepCounter,
  },
})
export default class FormTabbedContainer extends Vue {
  /**
   * the form schema which will render subContainer.
   */
  @Prop({ required: true }) private schema!: IContainerSchema;
  /**
   * the data object with keys as fieldId and value bound to v-model of component.
   */
  @Prop({ required: true }) private data!: any;
  // @Prop(String) value!: string;
  private activeContainer: string = this.schema.children[0].id;

  private created(): void {
    this.$emit(signals.ON_CONTAINER_LOAD);
  }

  private get activeContainerId(): string {
    return this.activeContainer;
  }
  private set activeContainerId(activeContainerId: string) {
    this.activeContainer = activeContainerId;
  }

  private get activeContainerIndex(): number {
    const index: number = this.schema.children.findIndex(
      (container: IContainerComponentParentSchema) => container.id === this.activeContainerId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleContainerIndex === -1 ? 0 : this.firstVisibleContainerIndex;
    }
    return index;
  }

  private get firstVisibleContainerIndex(): number {
    const index: number = this.schema.children.findIndex(
      (container: IContainerComponentParentSchema) => !container.isHidden
    );
    return index === -1 ? 0 : index;
  }

  private get lastVisibleContainerIndex(): number {
    const reverseContainers: IContainerComponentParentSchema[] = [...this.schema.children].reverse();
    const reverseContainerIndex: number = reverseContainers.findIndex(
      (container: IContainerComponentParentSchema) => !container.isHidden
    );
    return reverseContainerIndex === -1
      ? this.schema.children.length - 1
      : Math.abs(reverseContainerIndex - (this.schema.children.length - 1));
  }

  private get isPreviousVisible(): boolean {
    return this.firstVisibleContainerIndex > -1 && this.activeContainerIndex > this.firstVisibleContainerIndex;
  }

  private previousContainerIndex(formIndex: number): number {
    const reverseContainers: IContainerComponentParentSchema[] = [...this.schema.children].reverse();
    const reverseContainerIndex: number = Math.abs(formIndex - (this.schema.children.length - 1));
    const reverseNextFormIndex: number = reverseContainers.findIndex(
      (container: IContainerComponentParentSchema, index: number) =>
        index > reverseContainerIndex && !container.isHidden
    );
    return reverseNextFormIndex === -1 ? formIndex : Math.abs(reverseNextFormIndex - (this.schema.children.length - 1));
  }

  private setActiveContainer(activeContainerId: string): void {
    const index: number = this.schema.children.findIndex(
      (container: IContainerComponentParentSchema) => container.id === activeContainerId && !container.isHidden
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
        (this.schema.children[index] as ISubContainerSchema).isSubmitted ||
        (this.schema.children[this.previousContainerIndex(index)] as ISubContainerSchema).isSubmitted)
    ) {
      this.schema.children.forEach((container: IContainerComponentParentSchema) => {
        (container as ISubContainerSchema).isActive = false;
        if (container.id === activeContainerId) {
          (container as ISubContainerSchema).isActive = true;
        }
      });
    } else {
      const incompleteFormIndex: number = this.schema.children.findIndex(
        (container: IContainerComponentParentSchema) =>
          !(container as ISubContainerSchema).isSubmitted && !container.isHidden
      );

      let activeIndex: number = this.schema.children.findIndex(
        (container: IContainerComponentParentSchema) =>
          (container as ISubContainerSchema).isActive === true && !container.isHidden
      );
      if (activeIndex === -1) {
        // Make last submitted form active if all schema.children are submitted and no form is active
        activeIndex = this.lastVisibleContainerIndex;
      }
      this.activeContainerId = this.schema.children[activeIndex].id;
    }
  }
  private handleTabChange(event: IStepClickEvent): void {
    this.activeContainerId = event.containerId;
    /**
     * Fired when a tab is changed/clicked.
     * @param {IStepClickEvent} event
     */
    this.$emit('tabChange', event);
  }

  private handleSubmit(): void {
    if (!this.isValid(true)) {
      return;
    }
    this.$emit(signals.ON_BEFORE_SUBMIT);
    this.$emit(signals.ON_AFTER_SUBMIT, this.schema.id, this.data);
  }

  /**
   * Gets called when parent wants to access ref of the components.
   * It will return ref of wrapperComponent/subContainer
   * @param {string} fieldId
   * @returns {any}
   * @public
   */
  public getFieldRef(fieldId: string): any {
    if (this.$refs[fieldId]) {
      return this.$refs[fieldId];
    } else {
      for (let item of this.schema.children) {
        if (this.$refs[item.id]) {
          return (this.$refs[item.id] as any).getFieldRef(fieldId);
        }
      }
    }
  }

  /**
   * Gets called to check validity of the child components
   * @param {boolean} showError
   * @returns {boolean}
   * @public
   */
  public isValid(showError: boolean = false): boolean {
    this.$emit(signals.ON_BEFORE_VALIDATE);
    let isValid = true;
    this.schema.children.forEach((component: IContainerComponentParentSchema): void => {
      isValid = (this.$refs[component.id] as any) ? (this.$refs[component.id] as any).isValid(showError) : true;
    });
    return isValid;
  }
}
</script>

<style scoped>
.box {
  border: 1px solid;
  margin-bottom: 20px;
  padding: 20px;
}
</style
>>
