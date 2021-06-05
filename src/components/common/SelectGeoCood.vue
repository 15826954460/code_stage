<template>
  <a-select
    class="province-bank-container"
    placeholder="请选择省份"
    :value="value"
    @change="handleChange"
  >
    <a-select-option
      v-for="(item, index) in geocoordList"
      :value="item.areaCode"
      :key="index"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { GEO_COORD } from "@/constant";
export default {
  name: "select-province-com",

  props: {
    value: {
      type: [Number, String],
      default: '',
    },
  },

  data() {
    return {
      geocoordList: GEO_COORD,
    };
  },

  methods: {
    handleChange(val) {
      this.$emit("change", val);
    },
  },
};
</script>
