/* eslint-disable import/prefer-default-export */
import { StoreOptions, ModuleTree, MutationTree } from 'vuex';
import { IRoot } from '@/shared/interfaces';
import getters from './rootGetters';
import actions from './rootActions';
// Modules
import { todo } from '../todo';

// State
const state: IRoot = {};

// Mutations
const mutations: MutationTree<IRoot> = {};

// Modules
const modules: ModuleTree<IRoot> = {
    todo
};

// Root Module
export const root: StoreOptions<IRoot> = {
    state,
    getters,
    mutations,
    actions,
    modules
};
