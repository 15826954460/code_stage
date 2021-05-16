<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "app-home",

  data() {
    return {};
  },

  computed: {},

  mounted() {
    this.fetTreeList();
  },

  methods: {
    ...mapActions(["getProjectListAct"]),

    handleMeunItem({ keyPath, key }) {
      console.log(keyPath, key);
      this.$router.push({ path: `${key}` });
    },

    fetTreeList() {
      this.getProjectListAct();
    }
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
