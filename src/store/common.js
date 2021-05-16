/**
 * @author bys
 * @date 2021-03-10 20:14:34
 * @description 全局store
 */
import api from "@/axios/api";
import { AREA_OBJ_DATA } from "@/constant";

function mapProjectTree(treeList) {
  if (!treeList.length) return [];
  return treeList.map(item => {
    return { ...item, areaName: AREA_OBJ_DATA[item.areaCode] }
  });
}

const state = {
  isNetError: false,
  isLogined: false,
  token: "",
  companyList: [],
  projectTreeList: [],
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

  updateCompanyList(state, list = []) {
    state.companyList = list;
  },

  uedateProjectTreeList(state, list = []) {
    state.projectTreeList = list;
  }
};

const actions = {
  // 获取用户列表
  getUserListAct: async ({ commit, state, rootState }, params = {}) => {
    const { code, data, msg, count } = await api.user.getUserList(params);
    return { code, data, msg, count };
  },

  getCompanyListAct: async ({ commit /* state, rootState */ }) => {
    const { code, data, msg, count } = await api.company.getCompanyList();
    if (code === 200) {
      commit("updateCompanyList", data);
    }
    return { code, data, msg, count };
  },

  getProjectListAct: async ({ commit /* state, rootState */ }) => {
    const { code, data, msg, count } = await api.user.getProjectTree();
    if (code === 200) {
      commit("uedateProjectTreeList", mapProjectTree(data));
    }
    return { code, data, msg, count };
  }
};

export { state, mutations, actions };
