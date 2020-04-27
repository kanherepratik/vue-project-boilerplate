// import Vue from 'vue';
import { GetterTree } from 'vuex';
import { IRoot } from '@/shared/interfaces';
import { classToStoreCoreObject } from '../../utils';

export class RootGetters {}

export default classToStoreCoreObject<IRoot, IRoot>(RootGetters) as GetterTree<IRoot, IRoot>;
