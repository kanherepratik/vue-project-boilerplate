<template>
    <div class="home">
        <todo-component :propExample="propExample" />
    </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue';
import TodoComponent from '@/components/TodoComponent.vue';

export default Vue.extend({
    components: {
        'todo-component': TodoComponent
    },
    data() {
        return {
            propExample: { testProp: 2, modelName: '2' }
        };
    }
});
</script>
