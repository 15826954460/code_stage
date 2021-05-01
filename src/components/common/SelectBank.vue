<template>
  <a-select
    class="bank-container"
    :value="value"
    placeholder="请选择银行"
    @change="handleChange"
  >
    <a-select-option
      v-for="item in bankList"
      :value="Number(item.value)"
      :key="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { BANK_LIST } from "@/constant";
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
      bankList: BANK_LIST,
    };
  },

  methods: {
    handleChange(value, option) {
      this.$emit("change", value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
