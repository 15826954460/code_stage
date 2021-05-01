<template>
  <a-select :value="value" placeholder="请选择角色" @change="handleChange">
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
  },

  computed: {
    ...mapStateUser({
      userType: (state) => state.userInfo.userType,
    }),

    roleList() {
      let __roleList = [];
      switch (this.userType) {
        case 1:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType > 1;
          });
          break;
        case 2:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType > 2;
          });
          break;
        case 3:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType === 4;
          });
          break;
        case 5:
          __roleList = USER_ROLE_TYPE.filter((item) => {
            return item.userType === 4 || item.userType === 3;
          });
          break;
      }
      return __roleList;
    },
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
