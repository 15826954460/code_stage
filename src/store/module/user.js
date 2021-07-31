/**
 * @author bys
 * @date 2021-03-10 20:05:19
 * @description 模块管理
 */
import api from "@/axios/api";

const state = {
  userInfo: {
    adminType: null, // 1: 超级管理员 2: 管理员 3: 审核员 4: 信息录入员
    userType: null,  // 1: 管理员 2: 普通用户
    phone: null,
    username: "",
    tureName: "",
    userId: "",
    email: "",
  },
};

const mutations = {
  updateUserInfo(state, userinfo) {
    const { isAdmin: adminType, ...options } = userinfo;
    state.userInfo = {
      ...options,
      adminType,
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

  // 用户登陆
  loginAct: async ({ commit, state, rootState }, params) => {
    const { code, data } = await api.user.login(params);
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
