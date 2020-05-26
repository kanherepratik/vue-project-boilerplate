import { Module } from 'vuex';
import { IRoot, ITodoState } from '@/store/interfaces';
import getters from './todoGetters';
import actions from './todoActions';
import mutations from './todoMutations';

// State
const state: ITodoState = {
  todoList: [],
};

// Module
export const todo: Module<ITodoState, IRoot> = {
  state,
  getters,
  mutations,
  actions,
};
