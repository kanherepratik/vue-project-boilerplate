<template>
    <div>
        <div v-for="container in formSchema.children" :key="container.id">
            <div>this is form</div>
            <form-container
                :schema="container"
            > 
            </form-container>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FormContainer from './form-components/FormContainer.vue'
import { IFormSchema } from './interfaces/common';
import { formStructure } from './dummyData';

@Component
export default class FormIndex extends Vue {
    formSchema: IFormSchema = formStructure
    private created = () => {
    }
    public isValid = () => {
        return false
    }
}

</script>