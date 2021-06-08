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
      if (treeNode.dataRef.children.length) return;
      const { areaCode, id } = treeNode.dataRef;
      const { code, data, msg, count } = await api.user.getProjectTree({
        level: id ? 3 : 2, // 省级下面没有id, 代理下返回id
        areaCode,
      });

      if (code === 200) {
        this.uedateMapCenter(AREA_OBJ_DATA[Number(areaCode)]);
        const { mapPosition, treeList } = utils.mapProjectTree(data || []);
        console.log("treeList-----", treeList);
        treeNode.dataRef.children = treeList;
        this.updateTreeList({ code: areaCode, treeList });
        this.uedateMapPositionList(mapPosition);
        return true;
      } else {
        return;
      }
    },

    select(selectedKeys, { node: { dataRef } }) {
      const { areaCode, id, mapPosition } = dataRef;

      this.uedateMapCenter(AREA_OBJ_DATA[Number(areaCode)]);
      this.uedateMapPositionList([
        { lng: mapPosition[0], lat: mapPosition[1] },
      ]);
      // console.log('--------selectedKeys', dataRef);
      // console.log('--------options', dataRef);
    },

    updateTreeList({ treeList, code }) {
      const __treeList = [...this.treeList];
      __treeList.forEach(({ areaCode }, index) => {
        if (areaCode === code) {
          __treeList[index].children = treeList;
          return;
        }
      });
      this.uedateProjectTreeList(__treeList);
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
