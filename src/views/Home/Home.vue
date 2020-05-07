<template>
    <div class="home">
        <todo-component />
        <i18-component />
    </div>
</template>

<script>
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';
import I18Component from '../../components/I18Component.vue';

export default {
    name: 'Home',
    components: {
        'todo-component': TodoComponent,
        'i18-component': I18Component
    }
};
</script>
