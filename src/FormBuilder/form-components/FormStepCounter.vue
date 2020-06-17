<template>
  <div class="step-container">
    <ul class="steps-ul">
      <li
        v-for="(container, index) in visibleContainers"
        :key="container.id"
        class="steps-ul-step"
        :class="{
          filled: container.isSubmitted,
          active: container.isActive,
          'is-routable': canNavigate(index, container.isHidden),
        }"
        @click="onStepClick($event, container, index)"
      >
        <div class="step-no">
          <!--
  	        @slot slot for step number
	        -->
          <slot
            name="stepNumber"
            v-bind:index="index"
            v-bind:container="container"
            v-bind:canNavigate="canNavigate(index, container.isHidden)"
            v-bind:containerList="containerList"
          ></slot>
        </div>
        <span class="step-label">
          <!--
  	        @slot slot for step/tab label
	        -->
          <slot
            name="stepLabel"
            v-bind:index="index"
            v-bind:container="container"
            v-bind:canNavigate="canNavigate(index, container.isHidden)"
            v-bind:containerList="containerList"
            >{{ container.label }}</slot
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IStepContainer, IStepClickEvent } from '../shared/interfaces';
import { canNavigate } from '../shared/utils';

@Component({
  name: 'FormStepCounter',
})
export default class FormStepCounter extends Vue {
  /**
   * List of containers to render the steps/tabs.
   */
  @Prop({ type: Array, required: true }) private containerList!: IStepContainer[];
  /**
   * unique ID of container which is active.
   */
  @Prop(String) private activeContainerId!: string;

  private canNavigate(index: number, isFormHidden: boolean): boolean {
    return canNavigate(index, this.activeContainerIndex, isFormHidden);
  }

  private get firstVisibleFormIndex(): number {
    const index: number = this.containerList.findIndex((container: IStepContainer) => !container.isHidden);
    return index === -1 ? 0 : index;
  }

  private get activeContainerIndex(): number {
    const index: number = this.containerList.findIndex(
      (container: IStepContainer) => container.id === this.activeContainerId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleFormIndex === -1 ? 0 : this.firstVisibleFormIndex;
    }
    return index;
  }

  private get activeForm(): IStepContainer {
    return this.containerList[this.activeContainerIndex === -1 ? 0 : this.activeContainerIndex];
  }
  private get visibleContainers(): IStepContainer[] {
    return this.containerList.filter((form: IStepContainer) => !form.isHidden);
  }

  private onStepClick(event: any, container: IStepContainer, index: number): void {
    /**
     * Fired when step/tab is clicked.
     */
    this.$emit('stepClick', {
      containerId: container.id,
      containerIndex: index,
      canNavigate: this.canNavigate(index, container.isHidden),
      event,
    } as IStepClickEvent);
  }
}
</script>
<style scoped>
.steps-ul {
  display: flex;
  justify-content: center;
  list-style: none;
}
.steps-ul .steps-ul-step {
  margin-right: 50px;
}
</style>
