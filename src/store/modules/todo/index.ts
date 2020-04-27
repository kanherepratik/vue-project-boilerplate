/* eslint-disable import/prefer-default-export */
import { Module } from 'vuex';
import { IRoot, ITodoState } from '@/shared/interfaces';
// import { TODO_STORE } from '@/store/constants';
import getters from './todoGetters';
import actions from './todoActions';
import mutations from './todoMutations';

// State
const state: ITodoState = {
    todoList: []
};

// Mutations
// const mutations: MutationTree<ITodoState> = {
//     [TODO_STORE.MUTATIONS.ADD_TODO]: (currentState: ITodoState, payload: string): void => {
//         currentState.todoList.push(payload);
//     }
// };

// Module
export const todo: Module<ITodoState, IRoot> = {
    state,
    getters,
    mutations,
    actions
};
