/**
 * @author bys
 * @date 2021-03-10 20:14:34
 * @description 全局store
 */
import api from "@/axios/api";

const state = {
  isNetError: false,
  isLogined: false,
  token: "",
};

const mutations = {
  setNetError(state, bool) {
    if (state.isNetError === bool) return;
    state.isNetError = bool;
  },

  updateLogin(state, bool) {
    state.isLogined = bool;
  },

  updateToken(state, token = "") {
    state.token = token;
  },
};

const actions = {
  // 获取用户列表
  getUserListAct: async ({ commit, state, rootState }, params) => {
    const { code, data, msg, count } = await api.user.getUserList(params);
    return { code, data, msg, count };
  },
};

export { state, mutations, actions };
