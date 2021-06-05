<template>
  <div class="__flex __rfsfs manage-container">
    <div class="left-box">
      <a-tree
        :load-data="onLoadData"
        :tree-data="treeList"
      />
    </div>
    <div class="right-box">
      <map-com></map-com>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, createNamespacedHelpers } from "vuex";
const {
  mapActions: mapActionsUser,
  mapState: mapStateUser,
} = createNamespacedHelpers("user");

import MapCom from "@/components/common/Map.vue";
import { AREA_OBJ_DATA } from "@/constant";
import api from "@/axios/api";

import utils from "@/utils/common";

export default {
  name: "user-center-page",

  components: {
    MapCom,
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
    if (!this.treeList.length > 0) {
      this.getProjectListAct();
    }
  },

  methods: {
    ...mapActions(["getUserListAct", "getProjectListAct"]),

    ...mapMutations(["uedateMapPositionList"]),

    async onLoadData(treeNode) {
      console.log("---onLoadData-", treeNode);
      if (treeNode.dataRef.children) return;

      // const { mapPosition } = treeNode.dataRef;

      // treeNode.dataRef.children = [
      //   { title: "Child Node", key: `${treeNode.eventKey}-0` },
      //   { title: "Child Node", key: `${treeNode.eventKey}-1` },
      // ];
      // const { code, data, msg, count } = await api.user.getProjectTree({});
      // if (code === 200) {
      //   const __item = {
      //     title: `${AREA_OBJ_DATA[Number(areaCode)]} (${nums})`,
      //     key: areaCode,
      //   }
      //   treeNode.dataRef.children.push(__item)
      // }
    },
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
