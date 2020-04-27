import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRoot } from '@/shared/interfaces';
import { todo } from './modules/todo';

Vue.use(Vuex);

const store: StoreOptions<IRoot> = {
    state: {
        version: '1.0.0' // a simple property
    },
    modules: {
        todo
    }
};

export default new Vuex.Store<IRoot>(store);
