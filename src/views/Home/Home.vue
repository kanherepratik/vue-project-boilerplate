<template>
    <div class="home">
        <todo-component />
    </div>
</template>

<script>
// @ is an alias to /src
import TodoComponent from '@/components/TodoComponent.vue';

export default {
    name: 'Home',
    components: {
        'todo-component': TodoComponent
    }
};
</script>
