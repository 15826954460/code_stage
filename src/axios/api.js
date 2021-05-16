/**
 * @author 柏运送 15826954460
 * @date 2021-03-10 20:08:43
 * @description api 统一管理
 */

import { getFetch, postFetch, uploadFile } from "./axios";

export default {
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
        method: "PUT",
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
  },

  company: {
    // ------ 获取单位列表
    getCompanyList(params) {
      return getFetch({
        url: "/projects",
        interfaceKey: "getCompanyList",
        params,
      });
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

  unit: {
    // 获取建筑列表
    getBuildingList() {
      return getFetch({
        url: "/buildings",
        interfaceKey: "getBuildingList",
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
};
