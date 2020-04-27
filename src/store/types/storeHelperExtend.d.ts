declare module 'store-helper-extend' {
    // Getters
    import { TodoGetters } from '@/store/modules/todo/todoGetters';

    // Actions
    import { TodoActions } from '@/store/modules/todo/todoActions';

    // Class extend interface is working as expected but we are not directly call the store action
    // We need to use dispatch to call the action so can't just extend the store action interfce directly

    // NOTE: Keep root actions and getters in the end as they are top level

    module 'store-helper' {
        type ActionsHelper = ActionExtend<TodoActions>;

        type GettersHelper = GetterExtend<TodoGetters>;
    }
}
