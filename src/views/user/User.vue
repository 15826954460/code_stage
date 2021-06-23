<template>
  <div class="__flex __rfsfs manage-container">
    <div class="left-box">
      <a-tree :load-data="onLoadData" :tree-data="treeList" @select="select" />
    </div>
    <div class="right-box">
      <map-com></map-com>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapState,
  mapMutations,
  createNamespacedHelpers,
} from "vuex";
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
      newTreeList: [],
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

    ...mapMutations([
      "uedateMapPositionList",
      "uedateProjectTreeList",
      "uedateMapCenter",
    ]),

    async onLoadData(treeNode) {
      if (treeNode.dataRef.children) return;
      const { areaCode, id, projectId } = treeNode.dataRef;
      const { code, data, msg, count } = await api.user.getProjectTree({
        level: id ? 3 : 2, // 省级下面没有id, 代理下返回id
        areaCode,
        projectId: id ? id : "",
      });

      if (code === 200) {
        this.uedateMapCenter(AREA_OBJ_DATA[Number(areaCode)]);
        const { mapPosition, treeList } = this.mapProjectTree(data || []);
        treeNode.dataRef.children = treeList;
        this.newTreeList = [...this.treeList];
        this.updateTreeList({
          code: areaCode,
          children: treeList,
          treeList: this.newTreeList,
        });
        this.uedateMapPositionList(mapPosition);
        this.uedateProjectTreeList(this.newTreeList);
        return true;
      } else {
        return;
      }
    },

    mapProjectTree(treeList) {
      if (!treeList.length) return [];
      let __mapPositionList = [];
      let __treeList = [];
      treeList.forEach(
        ({ areaCode, id, nums, parentId, projectName, mapPosition }) => {
          const __params = {};
          __params.title = `${projectName}(${nums})`;
          __params.key = id;
          __params.mapPosition = mapPosition;
          __params.areaCode = Number(areaCode);
          __params.id = id;
          __params.isLeaf = nums > 0 ? false : true;
          __mapPositionList.push({
            lng: mapPosition.split(",")[0],
            lat: mapPosition.split(",")[1],
          });
          __treeList.push(__params);
        }
      );
      return { treeList: __treeList, mapPosition: __mapPositionList };
    },

    // 点击折叠跟新 mark 和 center
    select(selectedKeys, { node: { dataRef } }) {
      const { areaCode, id, mapPosition } = dataRef;
      this.uedateMapCenter(AREA_OBJ_DATA[Number(areaCode)]);
      this.uedateMapPositionList([
        {
          lng: mapPosition.split(",")[0],
          lat: mapPosition.split(",")[1],
        },
      ]);
    },

    updateTreeList({ children, code, treeList }) {
      for (let i = 0, len = treeList.length; i < len; i++) {
        const { areaCode, id } = treeList[i];
        if (id && areaCode === code) {
          treeList[i].children = children;
          return;
        }
      }
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
