// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ISuffixDivisorMap } from './interfaces';

export const IS_MOBILE_DEVICE: boolean = (window as any).IS_MOBILE || false;

export const TODO_STORE = {
  MUTATIONS: {
    ADD_TODO: 'addTodo',
  },
};

export const SUFFIX_DIVISOR_MAP: ISuffixDivisorMap = {
  thousand: 1000,
  lakh: 100000,
  crore: 10000000,
};
