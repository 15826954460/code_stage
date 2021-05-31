<template>
  <div class="test-container">待开发</div>
</template>

<script>
import { areaList } from "@/constant/province-data";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    const obj = {};
    areaList.forEach(({ code, label }) => {
        obj[code] = label;
    });
  },
};
</script>

<style scoped lang="scss">
</style>
