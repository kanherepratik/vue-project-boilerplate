import { MutationTree } from 'vuex';
import { TOAST_STORE } from '@/store/constants';
import { IToastState, IToast } from '@/store/interfaces';

const mutations: MutationTree<IToastState> = {
  [TOAST_STORE.MUTATIONS.ADD_TOAST]: (currentState: any, payload: IToast): void => {
    currentState.toast = payload;
  },
};

export default mutations;
