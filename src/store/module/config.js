/**
 * @author bys
 * @date 2021-03-10 20:05:19
 * @description 模块管理
 */
import api from "@/axios/api";

const state = {
  config: {
    categorysList: [], // 监测类别
    gatewaysList: [], // 网关产品型号
    modelIdList: [], // 设备型号
  },
};

const mutations = {
  updateConfig(state, cfg) {
    const { config } = state;
    const { categorys: categorysList, gateways: gatewaysList, models: modelIdList } = cfg;
    state.config = {
      ...config,
      categorysList,
      gatewaysList,
      modelIdList,
    }
  },
};

const actions = {
  // 获取设备配置信息
  updateConfigAct: async ({ commit, state, rootState }, params) => {
    const { code, data } = await api.common.getConfig();
    if (code === 200) {
      commit('updateConfig', data);
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
