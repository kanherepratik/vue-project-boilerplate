import { Module } from 'vuex';
import { IRoot, IToastState } from '@/store/interfaces';
import getters from './toastGetters';
import actions from './toastActions';
import mutations from './toastMutations';

const state: IToastState = {
  toast: { text: '' },
};

// Module
export const toast: Module<IToastState, IRoot> = {
  state,
  getters,
  mutations,
  actions,
};
