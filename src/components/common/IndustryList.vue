<template>
  <a-select
    class="bank-container"
    :value="value"
    placeholder="请选择行业类别"
    @change="handleChange"
  >
    <a-select-option
      v-for="item in industryList"
      :value="Number(item.value)"
      :key="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { INDUSTRY_LIST } from "@/constant";

export default {
  name: "select-bank-com",

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

  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
