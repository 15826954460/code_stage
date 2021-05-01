import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, actions } from "./common";
import user from './module/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user
  }
})
