<template>
  <a-select :value="value" placeholder="请选择角色" @change="handleChange" :disabled="disabled">
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
import { USER_ROLE_TYPE } from "@/constant";

import { createNamespacedHelpers } from "vuex";
const { mapState: mapStateUser } = createNamespacedHelpers("user");

export default {
  name: "select-type-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    disabled: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      roleList: USER_ROLE_TYPE,
    };
  },

  computed: {
    ...mapStateUser({
      userType: (state) => state.userInfo.userType,
    }),
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
