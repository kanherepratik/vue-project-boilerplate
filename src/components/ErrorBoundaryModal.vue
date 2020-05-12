<template>
  <portal to="modals">
    <modal :show="true" class="cf-modal__error" :showCloseIcon="false">
      <div class="edm__header">OH..No!</div>
      <img :src="`${STATIC_URL}images/error-icon.svg`" />
      <div class="edm__title">looks like something blew up!</div>
      <div class="edm__descr" v-if="tollFree">
        Our Ninjas are looking into it. You can reload the page & try again or call us on our toll free number
        <strong>{{ tollFree }}.</strong>
      </div>
      <div class="edm__cf-button">
        <cf-button title="Reload" class="edm__reload" @click="reload" />
      </div>
      <div class="edm__cf-button">
        <cf-button title="Go to home page" class="edm__previous" @click="goHome" />
      </div>
    </modal>
  </portal>
</template>

<script lang="ts">
// import Vue from 'vue';
// import { Component } from 'vue-property-decorator';
// import { CONTACT_US, TOLL_FREE_NUMBER } from '@/shared/constants';
// import { redirectToHomePage } from '@/shared/utils/routerHelper';

// @Component({
//     name: 'error-boundary-modal'
// })
// export default class ErrorBoundaryModal extends Vue {
//     private tollFree: string = TOLL_FREE_NUMBER;

//     private goHome(): void {
//         redirectToHomePage();
//     }

//     private reload(): void {
//         window.location.reload();
//     }
// }
//
</script>
