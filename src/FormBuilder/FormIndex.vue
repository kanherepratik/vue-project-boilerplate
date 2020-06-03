<template>
  <div>
    <form-container
      v-for="container in formSchema.children"
      :key="container.id"
      :schema="container"
      :data="data"
      :ref="container.id"
      :id="container.id"
      v-on="$listeners"
      @onAfterSubmit="getDataOnSubmit"
    >
    </form-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue';
import { IFormSchema, IWrapperComponent } from './interfaces/common';
import { formStructure } from './dummyData';
import { signals } from './signals';

@Component({
  components: {
    'form-container': FormContainer,
  },
})
export default class FormIndex extends Vue {
  private formSchema: IFormSchema = formStructure;
  private data: any = {
    name: '',
    gender: '',
    address: '',
    buyerRole: '',
    panCard: '',
    tnc: [],
    containerRadio: 'c1',
  };
  // private handleChange(fieldId: string, value: any): void {
  //   switch (fieldId) {
  //     case 'tnc': {
  //       // debugger;
  //       // console.log(this.getFieldRef('panCard'));
  //     }
  //   }
  //   // console.log('container', fieldId, value);
  // }

  // private handleBlur(fieldId: string, value: any): void {
  //   console.log('container', fieldId, value);
  // }
  //example for getting data on after submit from container
  private getDataOnSubmit(containerId: string, data: any): void {
    console.log('getData from index', data, containerId);
  }
  public isValid = () => {
    return false;
  };

  public getFieldRef(fieldId: string): IWrapperComponent | undefined {
    for (let container of this.formSchema.children) {
      if ((this.$refs[container.id] as any)[0].$refs[fieldId]) {
        return (this.$refs[container.id] as any)[0].$refs[fieldId][0];
      }
    }
  }
}
</script>