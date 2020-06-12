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
        @click="onStepClick($event, container, index);"
      >
        <div class="step-no">
          <!--
						Display step number. index `:number`, forms `:IForm[]`, form `:IForm`, canNavigate `:boolean` and data `:any` available in slot properties.
          -->
          <slot
            name="stepNumber"
            v-bind:index="index"
            v-bind:container="container"
            v-bind:data="data"
            v-bind:canNavigate="canNavigate(index, container.isHidden)"
            v-bind:containerList="containerList"
          >
            <!-- Form index + 1 -->
          </slot>
        </div>
        <span class="step-label">
          <!--
						Display step label. index `:number`, forms `:IForm[]`, form `:IForm`, canNavigate `:boolean` and data `:any` available in slot properties.
          -->
          <slot
            name="stepLabel"
            v-bind:index="index"
            v-bind:container="container"
            v-bind:data="data"
            v-bind:canNavigate="canNavigate(index, container.isHidden)"
            v-bind:containerList="containerList"
          >
            <!-- Form name -->
            {{ container.label }}
          </slot>
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IContainerSchema, IStepClickEvent } from '../interfaces/common';
import { canNavigate } from '../utils';
// import { IForm, IFormSection, IFormField, IStepClickEvent } from './shared/interfaces';
// import { canNavigate } from './shared/utils';

@Component({
  name: 'FormStepCounter',
})
export default class FormStepCounter extends Vue {
  // Array of forms `:IForm`
  @Prop({ type: Array, required: true }) private containerList!: IContainerSchema[];
  // Dictionary of field id and data
  // tslint:disable:arrow-return-shorthand
  @Prop({
    type: Object,
    default: (): { [key: string]: any } => {
      return {};
    },
    required: false,
  })
  private data!: { [key: string]: any };
  // Form id of active form
  @Prop(String) private activeContainerId!: string;

  private canNavigate(index: number, isFormHidden: boolean): boolean {
    return canNavigate(index, this.activeContainerIndex, isFormHidden);
  }

  private get firstVisibleFormIndex(): number {
    const index: number = this.containerList.findIndex((container: IContainerSchema) => !container.isHidden);
    return index === -1 ? 0 : index;
  }

  private get activeContainerIndex(): number {
    const index: number = this.containerList.findIndex(
      (container: IContainerSchema) => container.id === this.activeContainerId && !container.isHidden
    );
    if (index === -1) {
      return this.firstVisibleFormIndex === -1 ? 0 : this.firstVisibleFormIndex;
    }
    return index;
  }

  private get activeForm(): IContainerSchema {
    return this.containerList[this.activeContainerIndex === -1 ? 0 : this.activeContainerIndex];
  }
  private get visibleContainers(): IContainerSchema[] {
    return this.containerList.filter((form: IContainerSchema) => !form.isHidden);
  }

  private onStepClick(event: any, container: IContainerSchema, index: number): void {
    // Fired when a step is clicked
    // @arg `:IStepClickEvent`<br/>Form properties of the form clicked on
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