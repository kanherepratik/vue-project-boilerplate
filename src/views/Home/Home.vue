<template>
    <div class="home">
        <todo-component />
        <radio-button />
    </div>
</template>

<script>
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import RadioButton from '../../components/RadioButton.vue';

export default {
    name: 'Home',
    components: {
        'todo-component': TodoComponent,
        'radio-button': RadioButton
    }
};
</script>
