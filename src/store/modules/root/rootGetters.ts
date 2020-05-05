import { IRoot } from '@/store/interfaces';
import { classToStoreCoreObject } from '@/store/utils';
import { GetterTree } from 'vuex';

export class RootGetters {
  public version(currentState: IRoot): string {
    return currentState.version;
  }
}

export default classToStoreCoreObject<IRoot, IRoot>(RootGetters) as GetterTree<IRoot, IRoot>;
