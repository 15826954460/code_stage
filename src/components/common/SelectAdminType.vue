<template>
  <a-select
    :value="value"
    placeholder="请选择角色"
    :disabled="disabled"
    @change="handleChange"
  >
    <a-select-option
      v-for="item in roleList"
      :value="Number(item.value)"
      :key="item.value"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { ADMIN_ROLE_TYPE_LIST } from "@/constant";

export default {
  name: "select-admintype-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      roleList: ADMIN_ROLE_TYPE_LIST,
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
