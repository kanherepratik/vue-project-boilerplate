declare module 'store-helper-extend' {
  // Getters
  import { TodoGetters } from '@/store/modules/todo/todoGetters';
  import { RootGetters } from '@/store/modules/root/rootGetters';

  // Actions
  import { TodoActions } from '@/store/modules/todo/todoActions';
  import { RootActions } from '@/store/modules/root/rootActions';

  // Class extend interface is working as expected but we are not directly call the store action
  // We need to use dispatch to call the action so can't just extend the store action interface directly

  // NOTE: Keep root actions and getters in the end as they are top level

  module 'store-helper' {
    interface IActionsHelper extends ActionExtend<TodoActions>, ActionExtend<RootActions> {}

    interface IGettersHelper extends GetterExtend<TodoGetters>, GetterExtend<RootGetters> {}
  }
}
