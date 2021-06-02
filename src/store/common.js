/**
 * @author bys
 * @date 2021-03-10 20:14:34
 * @description 全局store
 */
import api from "@/axios/api";
import { AREA_OBJ_DATA } from "@/constant";

function mapProjectTree(treeList) {
  if (!treeList.length) return [];
  let __treeList = [];
  treeList.forEach(({
    areaCode,
    id,
    nums,
    parentId,
    projectName,
  }) => {
    if (AREA_OBJ_DATA[Number(areaCode)]) {
      const __params = {
        title: `${AREA_OBJ_DATA[Number(areaCode)]} (${nums})`,
        key: areaCode,
      }
      if (nums > 0) {
        __params.children = []
      }
      // __treeList.push({
      //   id, nums, parentId, projectName, areaName: AREA_OBJ_DATA[Number(areaCode)], areaCode
      // });
      __treeList.push(__params)
    }
  });
  console.log('------__treeList', __treeList);
  return __treeList;
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
      commit("uedateProjectTreeList", mapProjectTree(data || []));
    }
    return { code, data, msg, count };
  }
};

export { state, mutations, actions };
