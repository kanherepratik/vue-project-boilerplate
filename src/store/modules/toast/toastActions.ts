import { ActionContext, ActionTree } from 'vuex';
import { IRoot, IToastState, IToast } from '@/store/interfaces';
import { TOAST_STORE } from '@/store/constants';
import { classToStoreCoreObject } from '../../utils';

export class ToastActions {
  public addToast(context: ActionContext<IToastState, IRoot>, payload: IToast): void {
    context.commit(TOAST_STORE.MUTATIONS.ADD_TOAST, payload);
  }
}

export default classToStoreCoreObject<IToastState, IRoot>(ToastActions) as ActionTree<IToastState, IRoot>;
