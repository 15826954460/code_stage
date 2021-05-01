/**
 * @author bys
 * @date 2021-03-10 20:05:19
 * @description 模块管理
 */
import api from "@/axios/api";

const state = {
  userInfo: {
    userType: 0, // 1: 超管 2: 管理员 3: 单位管理员 4: 普通用户 5: 代理用户
    username: "",
    phone: null,
    tureName: "",
    userId: "",
    email: "",
  },
};

const mutations = {
  updateUserInfo(state, userinfo) {
    const { userInfo } = state;
    state.userInfo = {
      ...userInfo,
      ...userinfo,
    };
  },

  clearUserInfo() {
    state.userInfo = {};
  },
};

const actions = {
  // 获取用户信息
  updateUserInfoAct: async ({ commit, state, rootState }, params) => {
    const { code, data } = await api.user.getUserInfo(params);
    if (code === 200) {
      commit('updateUserInfo', data);
    }
    return { code, data };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
