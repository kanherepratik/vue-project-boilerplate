<template>
  <div>
    {{ isErrorBoundaryError }} <slot></slot>
    <error-boundary-modal v-if="this.error" />
  </div>
</template>

<script lang="ts">
// import Vue from 'vue';
// import { Component, Watch } from 'vue-property-decorator';
// import ErrorBoundaryModal from './ErrorBoundaryModal.vue';

// @Component({
//     name: 'error-boundary',
//     components: {
//         'error-boundary-modal': ErrorBoundaryModal
//     }
// })
// export default class ErrorBoundary extends Vue {
//     private error: boolean | null = null;

//     private get isErrorBoundaryError(): void {
//         const triggeredError: Error | null = this.$store.gettersHelper.errorBoundaryError;
//         const triggeredInfo: string = this.$store.gettersHelper.errorBoundaryInfo;
//         const triggeredVm: Vue | null = this.$store.gettersHelper.errorBoundaryVm;
//         if (triggeredError && triggeredVm) {
//             this.showNLogError(triggeredError, triggeredVm, triggeredInfo);
//         }
//     }

//     private errorCaptured(err: Error, vm: Vue, info: string): boolean {
//         return this.showNLogError(err, vm, info);
//     }

//     private showNLogError(err: Error, vm: Vue, info: string): boolean {
//         this.error = true;
//         console.log(err);
//         this.sendRaven(err, vm.$store.state, info);
//         return false;
//     }

//     private sendRaven(err: Error, state: any, info: string): void {
//         import(/* webpackChunkName: "sentry" */ '@sentry/browser').then((Sentry) => {
//             Sentry.captureException(`${err.stack}\n\nfound in ${info} of component`);
//             try {
//                 Sentry.configureScope((scope: any) => {
//                     scope.setExtra('state', JSON.stringify(state));
//                 });
//             } catch (error) {
//                 console.error(error);
//             }
//         });
//     }

//     @Watch('$route')
//     private onRouteChange(to: any, from: any): void {
//         this.error = null;
//         this.$store.actionsHelper.errorBoundaryError(null);
//         this.$store.actionsHelper.errorBoundaryInfo('');
//         this.$store.actionsHelper.errorBoundaryVm(null);
//     }
// }
//
</script>
