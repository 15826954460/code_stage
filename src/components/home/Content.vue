<template>
  <a-layout class="components-layout-demo-top-side">
    <a-layout-header
      style="
        background-color: rgba(0, 21, 41, 0.7);
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 0 50px;
      "
    >
      <div class="logo" />
      <a-dropdown>
        <p
          class="__flex __rcc user-name-wrapper"
          style="display: flex; padding: 0 10px; margin: 0; height: 40px"
        >
          <a-icon type="user" style="color: lightblue; margin-right: 8px" />
          <span class="user-name">{{ username }}</span>
          <a-icon type="down" />
        </p>
        <a-menu slot="overlay">
          <a-menu-item>
            <span @click.self="showLookUserInfoChange">个人信息</span>
          </a-menu-item>
          <!-- <a-menu-item>
            <span @click.self="updatePasswordHander">修改密码</span>
          </a-menu-item> -->
          <a-menu-item @click.self="logoutHandle">
            <span>退出登陆</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-layout-header>
    <a-layout style="background: #fff">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          v-if="isLogined"
          mode="inline"
          :default-selected-keys="defaultSelectedKeys"
          :default-open-keys="defaultOpenKeys"
          style="height: 100%; padding: 0; overflow-y: scroll"
          theme="dark"
          @click="handleMeunItem"
        >
          <a-menu-item key="/"> <a-icon type="home" /> 首页 </a-menu-item>
          <a-menu-item key="/user-center"> <a-icon type="home" /> 用户分布 </a-menu-item>


          <a-sub-menu>
            <span slot="title"> <a-icon type="setting" /> 管理中心 </span>
            <a-menu-item key="/unit-list"> 单位管理 </a-menu-item>
            <a-menu-item key="/build-list"> 建筑管理 </a-menu-item>
            <a-menu-item key="/user-manage"> 用户管理 </a-menu-item>
          </a-sub-menu>

          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="deployment-unit" /> 设备中心 </span>
            <a-menu-item key="/equipment-page"> 设备管理 </a-menu-item>
            <a-menu-item key="/equipmentList"> 设备展示 </a-menu-item>
            <a-menu-item key="/warning"> 设备警报 </a-menu-item>
          </a-sub-menu>

        </a-menu>
      </a-layout-sider>
      <a-layout-content style="padding-left: 10px; overflow-x: scroll">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
    <a-layout-footer
      style="
        text-align: center;
        height: 40px;
        padding: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      "
      >{{
        "《释格物联使用许可》，沪公网安备沪ICP备15035311号-1"
      }}</a-layout-footer
    >
  </a-layout>
</template>

<script>
import { createNamespacedHelpers, mapMutations, mapState } from "vuex";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");

import sessionStorage from "@/utils/session-storage";
import { DEFAULT_SELECT_KEYS, DEFAULT_OPEN_KEYS } from "@/constant";

export default {
  name: "HomeContentCom",

  data() {
    return {
      defaultOpenKeys: [],
      defaultSelectedKeys: ["/"],
    };
  },

  created() {
    const __defaultSelectedKeys = sessionStorage.get(DEFAULT_SELECT_KEYS);
    const __defaultOpenKeys = sessionStorage.get(DEFAULT_OPEN_KEYS);
    this.defaultSelectedKeys = __defaultSelectedKeys
      ? __defaultSelectedKeys
      : this.defaultSelectedKeys;
    this.defaultOpenKeys = __defaultOpenKeys
      ? __defaultOpenKeys
      : this.defaultOpenKeys;
  },

  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),
    ...mapStateUser({
      username: (state) => state.userInfo.username,
      userType: (state) => state.userInfo.userType,
    }),
  },

  methods: {
    ...mapMutations(["updateLogin", "updateToken"]),
    ...mapMutationsUser(["clearUserInfo"]),

    handleMeunItem({ keyPath, key }) {
      let __defaultSelectedKeys, __defaultOpenKeys;
      if (keyPath.length > 0) {
        __defaultSelectedKeys = keyPath.splice(0, 1);
        __defaultOpenKeys = keyPath;
      } else {
        __defaultOpenKeys = [];
        __defaultSelectedKeys = keyPath;
      }
      sessionStorage.set(DEFAULT_SELECT_KEYS, __defaultSelectedKeys);
      sessionStorage.set(DEFAULT_OPEN_KEYS, __defaultOpenKeys);
      if (this.$route.path === key) return;
      this.$router.push({ path: `${key}` });
    },

    updatePasswordHander() {
      this.$emit("modifyPassword", true);
    },

    showLookUserInfoChange() {
      this.$emit("modifyUserInfo", true);
    },

    logoutHandle() {
      this.clearUserInfo();
      this.updateLogin(false);
      this.updateToken();
      sessionStorage.clear();
      // if (this.$route.path !== "/" || this.$route.path !== "/test") {
      //   this.$router.push({ path: "/test" });
      // }
    },
  },
};
</script>

<style scoped lang="scss">
.components-layout-demo-top-side {
  height: 100vh;
  width: 100vw;
}

.logo {
  display: inline-block;
  width: 120px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
}

.user-name-wrapper {
  font-size: 16px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .user-name {
    margin-right: 5px;
  }
}
</style>
