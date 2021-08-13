/**
 * @author 柏运送 15826954460
 * @date 2021-03-10 20:08:43
 * @description api 统一管理
 */

import { getFetch, postFetch, uploadFile } from "./axios";

export default {
  // 公用
  common: {
    // 获取配置
    getConfig() {
      return getFetch({
        url: "/config",
        interfaceKey: "getConfig",
      });
    }
  },

  /** 用户模块 */
  user: {
    // -----登陆
    login(params) {
      return postFetch({
        url: "/users/user_login",
        interfaceKey: "login",
        params,
      });
    },

    // -------注册
    register(params) {
      return postFetch({
        url: "/users/register",
        interfaceKey: "register",
        params,
      });
    },

    // ------ 添加用户
    addUser(params) {
      return postFetch({
        url: "/users",
        interfaceKey: "addUser",
        params,
        method: "POST",
      });
    },

    // -------获取用户信息
    getUserInfo(params) {
      return getFetch({
        url: "/users",
        interfaceKey: "getUserInfo",
        params,
      });
    },

    // -------修改用户信息
    updateUserInfo(params) {
      return postFetch({
        url: "/users",
        interfaceKey: "updateUserInfo",
        params,
        method: "PUT",
      });
    },

    // --------修改密码
    updatePassword(params) {
      return postFetch({
        url: "/users/update_password",
        interfaceKey: "updatePassword",
        params,
        method: "PUT",
      });
    },

    // ------获取用户列表
    getUserList(params) {
      return getFetch({
        url: "/users",
        interfaceKey: "getUserList",
        params,
      });
    },

    // ------- 删除用户
    delUser(id) {
      return postFetch({
        url: "/users",
        interfaceKey: "delUser",
        params: { id },
        method: "DELETE",
      });
    },

    /**
     * @author bys
     * @date 2021-05-16 20:29:07
     * @description
     * @param { level, areaCode, projectId } // level菜单层级（1:省级列表，2 代理列表，3 普通列表）
     */
    getProjectTree(params = {}) {
      return getFetch({
        url: "/projects/tree",
        interfaceKey: "getProjectTree",
        params: {
          level: 1,
          ...params,
        }
      });
    }
  },

  // 公司
  company: {
    // 获取单位列表
    getCompanyList(params = {}) {
      return getFetch({
        url: "/projects",
        interfaceKey: "getCompanyList",
        params: {
          page: 1,
          pageSize: 10,
          ...params,
        },
      });
    },

    // 获取公司下拉列表
    getSelectCompany() {
      return getFetch({
        url: '/projects/all',
        interfaceKey: 'getSelectCompany'
      })
    },

    // 编辑单位
    updateCompanyList(params) {
      return postFetch({
        url: "/projects",
        interfaceKey: "updateCompanyList",
        params,
        method: "PUT",
      });
    },

    // 添加单位
    createCompanyList(params) {
      return postFetch({
        url: "/projects",
        interfaceKey: "createCompanyList",
        params,
        method: "POST",
      });
    },

    // 删除单位
    delCompanyList(id) {
      return postFetch({
        url: "/projects",
        interfaceKey: "createCompanyList",
        params: { id },
        method: "DELETE",
      });
    },
  },

  // 建筑
  unit: {
    // 获取建筑列表
    getBuildingList(params = {}) {
      return getFetch({
        url: "/buildings",
        interfaceKey: "getBuildingList",
        params,
      });
    },

    // 编辑建筑
    updateBuildingList(params) {
      return postFetch({
        url: "/buildings",
        interfaceKey: "updateBuildingList",
        params,
        method: "PUT",
      });
    },

    // 添加建筑
    createBuildingList(params) {
      return postFetch({
        url: "/buildings",
        interfaceKey: "createBuildingList",
        params,
        method: "POST",
      });
    },

    delBuilding(id) {
      return postFetch({
        url: "/buildings",
        interfaceKey: "delBuilding",
        params: { id },
        method: "DELETE",
      });
    }
  },

  /** 设备模块 */
  equipment: {
    // 获取设备列表
    getEquipmentList({ params = {} } = {}) {
      return getFetch({
        url: "/devices",
        interfaceKey: "getEquipmentList",
        params,
      });
    },

    // 编辑建筑
    updateEquipment(params) {
      return postFetch({
        url: "/devices",
        interfaceKey: "updateEquipment",
        params,
        method: "PUT",
      });
    },

    // 添加设备
    createEquipment(params) {
      return postFetch({
        url: "/devices",
        interfaceKey: "createEquipment",
        params,
        method: "POST",
      });
    },

    // 删除设备
    delEquipment(id) {
      return postFetch({
        url: "/devices",
        interfaceKey: "delEquipment",
        params: {id},
        method: "DELETE",
      });
    },

    //设备详情
    getDeviceDetail(id){
      return getFetch({
        url: "/devices/devices_current_data",
        interfaceKey: "getDeviceDetail",
        params: { id },
      });
    },

    // 获取设备状态
    getEquipmentStatus() {
      return getFetch({
        url: "/devices/count",
        interfaceKey: "getEquipmentStatus",
        method: "GET",
      });
    },
  },

  /** 设备分组模块 */
  group: {
    // 获取设备分组列表
    getGroupList() {
      return getFetch({
        url: "/group",
        interfaceKey: "getGroupList",
        method: "GET",
      });
    },

    // 编辑分组
    updateGroupList(params) {
      return postFetch({
        url: "/group",
        interfaceKey: "updateGroupList",
        params,
        method: "PUT",
      });
    },

    // 添加分组
    createGroupList(params) {
      return postFetch({
        url: "/group",
        interfaceKey: "createGroupList",
        params,
        method: "POST",
      });
    },

    // 删除分组
    delGroup(id) {
      return postFetch({
        url: "/group",
        interfaceKey: "delGroup",
        params: { id },
        method: "DELETE",
      });
    },

    //（绑定/解绑）设备至设备分组
    bindGroup(type,groupId,deviceIds) {
      return postFetch({
        url: "/group/devices",
        interfaceKey: "bindGroup",
        params:{type,groupId,deviceIds},
        method: "POST",
      });
    },

  },


  /** 设备警报模块 */
  warn: {
    // 获取实时警报列表
    getWarnRealTime({ params = {} } = {}) {
      return getFetch({
        url: "/warning",
        interfaceKey: "getWarnRealTime",
        method: "GET",
        params,
      });
    },

    // 获取实时警报列表
    getWarnHistory({ params = {} } = {}) {
      return getFetch({
        url: "/warning/history",
        interfaceKey: "getWarnHistory",
        method: "GET",
        params,
      });
    },
  },

  // 系统设置
  system: {
    // 获取所有事件类型
    getEventTypeList() {
      return getFetch({
        url: "/events/all",
        interfaceKey: "getEventTypeList",
      });
    },
  },

  /** 设备警报模块 */
  export: {
    // 获取实时警报列表
    getExportData({ params = {} } = {}) {
      return getFetch({
        url: "/export/device",
        interfaceKey: "getExportData",
        method: "GET",
        params,
      });
    },
  },
};
