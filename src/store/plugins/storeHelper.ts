/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';

export class StoreHelperMixin extends Vue {
    public beforeCreate(): void {
        if (this.$store) {
            const actions: any = {};
            Object.keys((this.$store as any)._actions).forEach((action) => {
                actions[action] = (...args: any[]) => this.$store.dispatch(action, ...args);
            });
            this.$store.actionsHelper = actions;
            this.$store.gettersHelper = this.$store.getters;
        }
    }
}

export default (localVue: any) => {
    localVue.mixin(new StoreHelperMixin());
};
