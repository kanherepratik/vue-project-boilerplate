import Vue, { VNode } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import storeHelper from './store/plugins/storeHelper';

Vue.config.productionTip = false;
Vue.use(storeHelper);

// if (SENTRY_ENV !== 'development') {
//     import(/* webpackChunkName: "sentry" */ '@sentry/browser').then((Sentry) => {
//         Sentry.init({
//             dsn: 'https://d850ef5acf4f4addab2477c9523e6584@app.getsentry.com/1342484',
//             integrations: [new Sentry.Integrations.Vue({ Vue })],
//             environment: SENTRY_ENV
//         });
//     });
// }

// Vue.prototype.STATIC_URL = STATIC_URL;

new Vue({
  router,
  store,
  render: (h): VNode => h(App),
}).$mount('#app');
