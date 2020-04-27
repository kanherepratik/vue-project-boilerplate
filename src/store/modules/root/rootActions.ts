import { ActionTree } from 'vuex';
import { classToStoreCoreObject } from '@/store/utils';
import { IRoot } from '@/shared/interfaces';
// Outer

export class RootActions {}

export default classToStoreCoreObject<IRoot, IRoot>(RootActions) as ActionTree<IRoot, IRoot>;
