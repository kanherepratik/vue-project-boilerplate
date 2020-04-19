import Vue from 'vue';
import Vuex from 'vuex';
import { ITodoState } from '@/shared/interfaces';

Vue.use(Vuex);

Vue.use(Vuex);

// add module states
export interface IRootState {
    todo: ITodoState;
}

const store = new Vuex.Store<IRootState>({});

export default store;
