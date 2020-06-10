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
          <!--
					Display step number. index `:number`, forms `:IForm[]`, form `:IForm`, canNavigate `:boolean` and data `:any` available in slot properties.
          -->
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
          <!--
					Display step label. index `:number`, forms `:IForm[]`, form `:IForm`, canNavigate `:boolean` and data `:any` available in slot properties.
          -->
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
        v-for="container in formSchema"
        :key="container.id"
        :schema="container"
        :data="formData"
        :ref="container.id"
        :id="container.id"
        v-on="$listeners"
        @onAfterSubmit="getDataOnSubmit"
      ></form-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue';
import { IWrapperComponent, IContainerSchema, IStepClickEvent } from './interfaces/common';
// import { formStructure } from './dummyData';
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
  @Prop(String) protected value!: string;
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
    // `v-model` input event.
    // @arg `:string`<br/>Form id of currently active form
    this.$emit('input', activeFormId);
  }

  public isValid = () => {
    return false;
  };

  public getFieldRef(fieldId: string): IWrapperComponent | undefined {
    for (let container of this.formSchema) {
      if ((this.$refs[container.id] as any)[0].$refs[fieldId]) {
        return (this.$refs[container.id] as any)[0].$refs[fieldId][0];
      }
    }
  }

  public get activeFormIndex(): number {
    const index: number = this.formSchema.findIndex(
      (container: IContainerSchema) => container.id === this.activeFormId && !form.formHidden
    );
    if (index === -1) {
      return this.firstVisibleFormIndex === -1 ? 0 : this.firstVisibleFormIndex;
    }
    return index;
  }

  private goToPreviousForm(): void {
    // Fired when `previous` navigation button is clicked
    // @arg `:INavigateClickEvent`<br/>Form properties of the previous form
    const previousIndex: number = this.previousFormIndex(this.activeFormIndex);
    if (previousIndex > -1 && previousIndex < this.activeFormIndex) {
      this.$emit('previousFormClick', {
        formId: this.forms[previousIndex].formId,
        formIndex: previousIndex,
      } as INavigateClickEvent);
    }
  }
  private get isPreviousVisible(): boolean {
    return this.firstVisibleFormIndex > -1 && this.activeFormIndex > this.firstVisibleFormIndex;
  }

  private onStepClick(event: IStepClickEvent): void {
    // Fired when a step on the `FormStepCounter` is clicked
    // @arg `:IStepClickEvent`<br/>Form properties of the form clicked on
    console.log('step clicked', event);
    this.$emit('stepClick', event);
  }
}
</script>