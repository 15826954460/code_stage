<template>
  <div class="warnning-page">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="实时警告">
        <warn :type="1"></warn>
      </a-tab-pane>

      <a-tab-pane key="2" tab="历史警报">
        <warn :type="2"></warn>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
import warn from "@/components/equipment/warn.vue";

export default {
  components: {
    warn
  },
};
</script>

<style scoped lang="scss">
.warnning-page {
  margin-top: 10px;
}
</style>

