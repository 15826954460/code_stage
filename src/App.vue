<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import { mapActions, createNamespacedHelpers } from "vuex";

const { mapMutations: mapMutationsConfig, mapActions: mapActionsConfig } =
  createNamespacedHelpers("config");

export default {
  name: "app-home",

  data() {
    return {
      locale: zhCN,
    };
  },

  computed: {},

  mounted() {
    this.fetchTreeList();
    this.fetchCompanyAllList();
    this.fetchBuildList();
    this.fetchDeviceConfig();
  },

  methods: {
    ...mapActions([
      "getProjectListAct",
      "getSelectCompanyList",
      "getAllBuildListAct",
    ]),

    ...mapActionsConfig(["updateConfigAct"]),

    handleMeunItem({ keyPath, key }) {
      console.log(keyPath, key);
      this.$router.push({ path: `${key}` });
    },

    fetchTreeList() {
      this.getProjectListAct();
    },

    fetchCompanyAllList() {
      this.getSelectCompanyList();
    },

    fetchBuildList() {
      this.getAllBuildListAct();
    },

    fetchDeviceConfig() {
      this.updateConfigAct();
    },
  },
};
</script>

<style lang="scss" scoped>
#components-layout-demo-top-side {
  height: 100vh;
}
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
