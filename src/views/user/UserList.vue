<template>
  <div class="user-list-container">
    <a-tabs :defaultActiveKey="defaultActiveKey" @change="tabChange">
      <a-tab-pane
        v-for="item in roleList"
        :key="`${item.value}`"
        :tab="item.label"
      >
        <Plarfrom
          :userType="item.value"
          :activeKey="activeKey"
          @click="getUserList"
          :loading="loading"
          :dataList="data"
        ></Plarfrom>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import api from "@/axios/api";
import Plarfrom from "@/components/user/Platform.vue";
import { USER_ROLE_TYPE } from "@/constant";
import utils from "@/utils/common";
const DEFATULT_ACTIVE_KEY = "2";

import { createNamespacedHelpers, mapState } from "vuex";
const { mapState: mapStateUser } = createNamespacedHelpers("user");

export default {
  name: "user-list-page",

  components: {
    Plarfrom,
  },

  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),
    ...mapStateUser({
      userType: (state) => state.userInfo.userType,
    }),

    roleList() {
      let __roleList = [];
      switch (this.userType) {
        case 1:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType > 1;
          });
          break;
        case 2:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType > 2;
          });
          break;
        case 3:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType == 4;
          });
          break;
        case 5:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType == 4 || item.userType === 3;
          });
          break;
      }
      return __roleList;
    },
  },

  watch: {
    isLogined(nv, olv) {
      if (nv) {
        this.getUserList();
        this.activeKey = this.roleList[0].userType;
      }
    }
  },

  data() {
    return {
      defaultActiveKey: DEFATULT_ACTIVE_KEY,
      activeKey: DEFATULT_ACTIVE_KEY,
      loading: false,
      data: [],
    };
  },

  mounted() {
    this.getUserList();
  },

  methods: {
    tabChange(key) {
      this.activeKey = key;
      this.getUserList();
    },

    async getUserList() {
      this.loading = true;
      const { code, data, msg } = await api.user.getUserList({
        userType: this.activeKey,
      });
      if (code === 200) {
        const __data = data.filter((item) => {
          return item.userType !== 1;
        });
        this.data = __data;
      } else {
        utils.log(`${msg}-----${code}`);
      }
      this.loading = false;
    },
  },
};
</script>
