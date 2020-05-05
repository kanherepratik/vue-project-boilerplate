/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-underscore-dangle */
import Vue from 'vue';

export class StoreHelperMixin extends Vue {
  public beforeCreate(): void {
    if (!this.$store) {
    } else {
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
