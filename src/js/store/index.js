import Vuex from 'vuex';
import Vue from 'vue';
import * as getters from './getters';
import users from './modlues/users';
Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    users,
  },
  strict: false,
})