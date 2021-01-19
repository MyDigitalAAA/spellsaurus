import Vue from 'vue';
import Vuex from 'vuex';

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);
Vue.$cookies.config('30d','','');

Vue.use(Vuex);

import user from './modules/user.store';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user
  },
  strict: debug
});