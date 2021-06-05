<template>
  <div class="company-container">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="公司用户">
        <PlatFormCompany></PlatFormCompany>
      </a-tab-pane>
      <a-tab-pane key="2" tab="个人代理" force-render>
        <PlatFormPersonal></PlatFormPersonal>
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
