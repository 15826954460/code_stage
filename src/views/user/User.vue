<template>
  <div class="__flex __rfsfs manage-container">
    <div class="left-box">
      <a-tree :load-data="onLoadData" :tree-data="treeList" />
    </div>
    <div class="right-box">
      <map-com></map-com>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, createNamespacedHelpers } from "vuex";
const {
  mapActions: mapActionsUser,
  mapState: mapStateUser,
} = createNamespacedHelpers("user");

import MapCom from "@/components/common/Map.vue";

import utils from "@/utils/common";

export default {
  name: "user-center-page",

  components: {
    MapCom
   },

  data() {
    return {
      loading: false,
      data: [],
    };
  },

  computed: {
    ...mapStateUser({
      userInfo: (state) => state.userInfo,
    }),
    ...mapState({
      treeList: (state) => state.projectTreeList,
    }),
  },

  mounted() {
    // this.getProjectListAct();
  },

  methods: {
    ...mapActions(["getUserListAct", "getProjectListAct"]),

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

    onLoadData(treeNode) {
      console.log("---onLoadData-", treeNode);
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        setTimeout(() => {
          treeNode.dataRef.children = [
            { title: "Child Node", key: `${treeNode.eventKey}-0` },
            { title: "Child Node", key: `${treeNode.eventKey}-1` },
          ];
          this.areaList = [...this.areaList];
          resolve();
        }, 1000);
      });
    },

    onSelect() {},
  },
};
</script>

<style scoped lang="scss">
.manage-container {
  height: 100%;
  .left-box {
    width: 250px;
    border-right: 1px solid #f6f6f6;
    height: 100%;
  }

  .right-box {
    width: calc(100% - 250px);
    height: 100%;
  }
}
</style>
