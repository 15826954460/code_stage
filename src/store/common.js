/**
 * @author bys
 * @date 2021-03-10 20:14:34
 * @description 全局store
 */
import api from "@/axios/api";
import { AREA_OBJ_DATA, GEO_COORD } from "@/constant";
import utils from "@/utils/common";

const state = {
  isNetError: false,
  isLogined: false,
  token: "",
  allCompanyList: [], // 所有单位列表
  companyList: [],
  projectTreeList: [],
  mapCenter: '北京',
  latlng: {
    lat: 39.915,
    lng: 116.404,
  },
  mapPositionList: [
    {
      lng: 116.404,
      lat: 39.915,
    },
  ],
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
    state.companyList = [...state.companyList, ...list];
  },

  updateAllCompanyList(state, list = []) {
    state.allCompanyList = list;
  },

  uedateProjectTreeList(state, list = []) {
    state.projectTreeList = list;
  },

  uedateMapPositionList(state, list = []) {
    state.mapPositionList = list;
  },

  uedateMapCenter(state, center) {
    state.mapCenter = center;
  },

  updateLatlng(state, latlng) {
    state.latlng = latlng;
  }
};

const actions = {
  // 获取用户列表
  getUserListAct: async ({ commit, state, rootState }, params = {}) => {
    const { code, data, msg, count } = await api.user.getUserList(params);
    return { code, data, msg, count };
  },

  getAllCompanyList: async ({ commit }, params = { pageSize: 9999 }) => {
    const { code, data, msg, count } = await api.company.getCompanyList(
      params
    );
    if (code === 200) {
      commit("updateAllCompanyList", data);
    }
    return { code, data, msg, count };
  },

  getCompanyListAct: async ({ commit /* state, rootState */ }, params = {}) => {
    const { code, data, msg, count } = await api.company.getCompanyList(
      params
    );
    commit("updateCompanyList", data);
    return { code, data, msg, count };
  },

  // 初始化调用,字节点自己获取数据
  getProjectListAct: async ({ commit /* state, rootState */ }) => {
    const { code, data, msg, count } = await api.user.getProjectTree();
    if (code === 200) {
      const { mapPosition, treeList } = utils.mapProjectTree(data || []);
      commit("uedateProjectTreeList", treeList);
      commit("uedateMapPositionList", mapPosition);
    }
    return { code, data, msg, count };
  },
};

export { state, mutations, actions };
