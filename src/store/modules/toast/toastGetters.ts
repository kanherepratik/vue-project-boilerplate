import { GetterTree } from 'vuex';
import { IRoot, IToastState, IToast } from '@/store/interfaces';
import { classToStoreCoreObject } from '../../utils';

export class ToastGetters {
  public getToast(currentState: IToastState): IToast {
    return currentState.toast;
  }
}

export default classToStoreCoreObject<IToastState, IRoot>(ToastGetters) as GetterTree<IToastState, IRoot>;
