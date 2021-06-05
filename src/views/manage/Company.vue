<template>
  <!--  1 普通公司 2 代理公司 3 个人代理 -->
  <div class="company-container">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="普通公司">
        <PlatFormCompany :type="1"></PlatFormCompany>
      </a-tab-pane>
      <a-tab-pane key="2" tab="公司代理">
        <PlatFormCompany :type="2"></PlatFormCompany>
      </a-tab-pane>
      <a-tab-pane key="3" tab="个人代理">
        <PlatFormPersonal :type="3"></PlatFormPersonal>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import PlatFormCompany from "@/components/company/PlatFormCompany.vue";
import PlatFormPersonal from "@/components/company/PlatFormPersonal.vue";

export default {
  name: "manage-page",

  components: {
    PlatFormCompany,
    PlatFormPersonal,
  },
};
</script>

<style scoped lang="scss">
.company-container {
  margin-top: 20px;
}
</style>
