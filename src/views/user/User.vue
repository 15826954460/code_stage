<template>
  <div class="__flex __rfsfs manage-container">
    <div class="tree-box">
      <!-- <a-tree
        :show-line="true"
        :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"
        @select="onSelect"
      >
      </a-tree> -->
    </div>
    <div class="content">
      待开发
    </div>
    <!-- <Plarfrom
      @click="getUserList"
      :loading="loading"
      :roleType="roleType"
      :dataList="data"
      btnText="创建用户"
    ></Plarfrom> -->
  </div>
</template>

<script>
import { mapActions, mapState, createNamespacedHelpers } from "vuex";
const {
  mapActions: mapActionsUser,
  mapState: mapStateUser,
} = createNamespacedHelpers("user");

import utils from "@/utils/common";
import Plarfrom from "@/components/user/Platform.vue";
import { areaList } from "@/constant/province-data.js";

export default {
  name: "user-center-page",

  components: { Plarfrom },

  data() {
    return {
      loading: false,
      data: [],
      areaList,
    };
  },

  computed: {
    ...mapStateUser({
      userInfo: (state) => state.userInfo,
    }),
  },

  mounted() {
    // this.getUserList();
  },

  methods: {
    ...mapActions(["getUserListAct"]),

    async getUserList() {
      this.loading = true;
      // 根据当前登陆用户的角色获取用户列表
      const { code, data, msg } = await this.getUserListAct();
      if (code === 200) {
        this.data = data;
      } else {
        utils.log(`${msg}-----${code}`);
      }
      this.loading = false;
    },

    onSelect() {},
  },
};
</script>

<style scoped lang="scss">
.manage-container {
  height: 100%;
  .tree-box {
    width: 300px;
    border-right: 1px solid #f6f6f6;
    height: 100%;
  }

  .content {
    flex: 1;
    height: 100%;
  }
}
</style>
