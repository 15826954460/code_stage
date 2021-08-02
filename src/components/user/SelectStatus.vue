<template>
  <a-select
    class="bank-container"
    :value="value && Number(value)"
    placeholder="请选择用户状态"
    @change="handleChange"
  >
    <a-select-option
      v-for="item in useStatusList"
      :value="Number(item.status)"
      :key="item.status"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { USER_STATUE_LIST } from "@/constant";
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
      useStatusList: USER_STATUE_LIST,
    };
  },

  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>
