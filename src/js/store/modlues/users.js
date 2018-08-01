import { SET_USERNAME } from '../mutation-types';

const state = {
  age: '',
  name: '',
  school: '',
};

const getters = {

};

const actions = {
  setUsername ({commit, state}, data) {
    commit(SET_USERNAME, data);
  }
};

const mutations = {
  [SET_USERNAME](state, newUserName) {
    if (!newUserName) {
      state.name = '';
      return;
    }
    state.name = newUserName;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};