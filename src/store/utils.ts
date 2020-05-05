/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionTree, GetterTree } from 'vuex';

export const classToStoreCoreObject = <S, R>(ctor: any): ActionTree<S, R> | GetterTree<S, R> => {
  const objResult: ActionTree<S, R> | GetterTree<S, R> = {};
  Object.getOwnPropertyNames(ctor.prototype).forEach((k) => {
    const protoVal: () => any = ctor.prototype[k];
    if (typeof protoVal === 'function' && k !== 'constructor') {
      objResult[k] = protoVal;
    }
  });
  return objResult;
};

export const setDefaults = <T>(state: T, defaults: T): void => {
  for (const key of Object.keys(defaults)) {
    (state as any)[key] = (defaults as any)[key];
  }
};
