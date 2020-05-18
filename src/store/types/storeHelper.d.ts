/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
declare module 'store-helper' {
  // vuex action interface
  interface IActionsHelper {}

  interface IGettersHelper {}

  module 'vuex/types' {
    interface Store<S> {
      actionsHelper: IActionsHelper;
      _actions: {
        [key: string]: () => any;
      };
      // can't redefine the property
      // ref: https://stackoverflow.com/questions/48690619/how-can-i-augment-a-property-within-a-third-party-typescript-interface-defined-a
      gettersHelper: IGettersHelper;
    }
  }
}
