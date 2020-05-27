<template>
  <div>
    <form-container
      v-for="container in formSchema.children"
      :key="container.id"
      :schema="container"
      :data="data"
      :ref="container.id"
      :id="container.id"
      @onAfterSubmit="getData"
    >
    </form-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue';
import { IFormSchema } from './interfaces/common';
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
    name: 'Prateek',
    gender: '',
    address: '',
    buyerRole: '',
  };
  //example for getting data on after submit from container
  private getData(containerId: string, data: any): void {
    console.log(data);
  }
  public isValid = () => {
    return false;
  };
}
</script>