import Vue from 'vue';
import Vuex from 'vuex';
import { IRoot } from '@/store/interfaces';
import { root } from '@/store/modules/root';

Vue.use(Vuex);

export default new Vuex.Store<IRoot>(root);
