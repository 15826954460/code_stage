/**
 * @author bys
 * @date 2021-03-10 20:14:34
 * @description 全局store
 */
import api from "@/axios/api";
import { AREA_OBJ_DATA, GEO_COORD } from "@/constant";

function mapProjectTree(treeList) {
  if (!treeList.length) return [];
  let __mapPositionList = [];
  let __treeList = [];
  treeList.forEach(({ areaCode, id, nums, parentId, projectName }, idx) => {
    const __params = {};
    if (AREA_OBJ_DATA[Number(areaCode)]) {
      const __item = AREA_OBJ_DATA[Number(areaCode)];
      __params.title = `${__item.label}(${nums})`;
      __params.key = __item.label;
      __params.mapPosition = __item.geoCoord;
      __params.areaCode = Number(areaCode);
      if (nums > 0) {
        __params.children = [];
      }
      __mapPositionList.push({
        lng: __item.geoCoord[0],
        lat: __item.geoCoord[1],
      });
      __treeList.push(__params);
    }
  });
  return { treeList: __treeList, mapPosition: __mapPositionList };
}

const state = {
  isNetError: false,
  isLogined: false,
  token: "",
  allCompanyList: [], // 所有单位列表
  companyList: [],
  projectTreeList: [],
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
};

const actions = {
  // 获取用户列表
  getUserListAct: async ({ commit, state, rootState }, params = {}) => {
    const { code, data, msg, count } = await api.user.getUserList(params);
    return { code, data, msg, count };
  },

  getCompanyListAct: async ({ commit /* state, rootState */ }, params = {}) => {
    const { isAll, ...options } = params;
    isAll && (params.pageSize = 9999);
    const { code, data, msg, count } = await api.company.getCompanyList(
      options
    );
    if (code === 200) {
      isAll
        ? commit("updateAllCompanyList", data)
        : commit("updateCompanyList", data);
    }
    return { code, data, msg, count };
  },

  // 初始化调用,字节点自己获取数据
  getProjectListAct: async ({ commit /* state, rootState */ }) => {
    const { code, data, msg, count } = await api.user.getProjectTree();
    if (code === 200) {
      const { mapPosition, treeList } = mapProjectTree(data || []);
      commit("uedateProjectTreeList", treeList);
      commit("uedateMapPositionList", mapPosition);
    }
    return { code, data, msg, count };
  },
};

export { state, mutations, actions };
