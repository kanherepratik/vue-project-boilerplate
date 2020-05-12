import { StoreOptions, ModuleTree, MutationTree } from 'vuex';
import { IRoot } from '@/store/interfaces';
import { ROOT_STORE } from '@/store/constants';
import getters from './rootGetters';
import actions from './rootActions';
// Modules
import { todo } from '../todo';

// State
const state: IRoot = {
  version: '0.1',
};

// Mutations
const mutations: MutationTree<IRoot> = {
  [ROOT_STORE.MUTATIONS.VERSION]: (currentState: IRoot, payload: string): void => {
    currentState.version = payload;
  },
};

// Modules
const modules: ModuleTree<IRoot> = {
  todo,
};

// Root Module
export const root: StoreOptions<IRoot> = {
  state,
  getters,
  mutations,
  actions,
  modules,
};
