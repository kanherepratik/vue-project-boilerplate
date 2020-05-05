/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
type ActionExtend<T> = {
  [K in keyof T]: T[K] extends (a: any) => infer R
    ? () => R
    : T[K] extends (a: any, payload: infer P) => infer R
    ? (payload: P) => R
    : T[K];
};

type GetterExtend<T> = {
  [K in keyof T]: T[K] extends (...a: any[]) => infer R ? R : T[K];
};
