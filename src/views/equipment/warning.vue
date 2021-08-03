<template>
  <div class="warnning-page">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="实时警告">
        <warnRealtime :type="1"></warnRealtime>
      </a-tab-pane>

      <a-tab-pane key="2" tab="历史警报">
        <warnHistory :type="2"></warnHistory>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
import warnRealtime from "@/components/equipment/warnRealtime.vue";
import warnHistory from "@/components/equipment/warnHistory.vue";

export default {
  components: {
    warnRealtime,
    warnHistory
  },
};
</script>

<style scoped lang="scss">
.warnning-page {
  margin-top: 10px;
}
</style>

