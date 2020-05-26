import { ActionTree, ActionContext } from 'vuex';
import { IRoot } from '@/store/interfaces';
import { classToStoreCoreObject } from '@/store/utils';
import { ROOT_STORE } from '@/store/constants';

export class RootActions {
  public version(context: ActionContext<IRoot, IRoot>, payload: string): void {
    context.commit(ROOT_STORE.MUTATIONS.VERSION, payload);
  }
}

export default classToStoreCoreObject<IRoot, IRoot>(RootActions) as ActionTree<IRoot, IRoot>;
