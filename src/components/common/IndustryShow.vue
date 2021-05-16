<template>
  <div class="industry-show-container">
    <span v-for="(item, index) in industryList" :key="index" v-show="value === item.value">
      {{ item.label }}
    </span>
  </div>
</template>

<script>
import { INDUSTRY_LIST } from "@/constant";

export default {
  name: "show-industry-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  data() {
    return {
      industryList: INDUSTRY_LIST,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
