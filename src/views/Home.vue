<template>
  <div>
    <LoginModule v-if="!isLogined" :visible="!isLogined"></LoginModule>
    <div class="content" v-show="isLogined">
      <Content
        @modifyPassword="modifyPassword"
        @modifyUserInfo="modifyUserInfo"
      ></Content>
    </div>
    <CusModule
      v-if="updateUserInfoModuleShow"
      :visible="updateUserInfoModuleShow"
      title="修改用户信息"
      @cancel="modifyUserInfo"
    >
      <Register
        v-if="updateUserInfoModuleShow"
        :isEdit="true"
        :userInfo="row"
        @cancel="modifyUserInfo"
      ></Register>
    </CusModule>
    <CusModule
      v-if="updatePasswordModuleShow"
      :visible="updatePasswordModuleShow"
      title="修改密码"
      @cancel="modifyPassword"
    >
      <UpdatePassword
        @cancel="modifyPassword"
        :updatePassword="true"
      ></UpdatePassword>
    </CusModule>
  </div>
</template>

<script>
import { mapState, mapMutations, createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");

import sessionStorage from "@/utils/session-storage";
import { TOKEN, USER_INFO } from "@/constant";

import CusModule from "@/components/common/CusModule.vue";
import Register from "@/components/common/Register.vue";
import UpdatePassword from "@/components/common/UpdatePassword.vue";
import LoginModule from "@/components/home/LoginModule.vue";
import Content from "@/components/home/Content.vue";

export default {
  name: "app-home",

  data() {
    return {
      updateUserInfoModuleShow: false,
      updatePasswordModuleShow: false,
      row: {},
    };
  },

  components: {
    LoginModule,
    Content,
    CusModule,
    Register,
    UpdatePassword,
  },

  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),

    ...mapStateUser({
      userInfo: (state) => state.userInfo,
    }),
  },

  created() {
    const token = sessionStorage.get(TOKEN);
    const userInfo = sessionStorage.get(USER_INFO);
    this.updateLogin(token ? true : false);
    this.updateUserInfo(TOKEN && userInfo ? userInfo : {});
  },

  methods: {
    ...mapMutations(["updateLogin"]),
    ...mapMutationsUser(["updateUserInfo"]),

    modifyPassword(bool) {
      this.updatePasswordModuleShow = bool;
    },

    modifyUserInfo(bool) {
      this.row = bool ? this.userInfo : {};
      this.updateUserInfoModuleShow = bool;
    },
  },
};
</script>