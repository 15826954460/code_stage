<template>
  <a-select
    class="province-bank-container"
    placeholder="请选择省份"
    :value="value"
    @change="handleChange"
    :labelInValue="true"
  >
    <a-select-option
      v-for="(item, index) in geocoordList"
      :value="item.areaCode"
      :key="index"
      :mapPosition="item.geoCoord.join(',')"
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
      type: Object,
      default: () => {
        return { key: '' }
      },
    },
  },

  data() {
    return {
      geocoordList: GEO_COORD,
    };
  },

  methods: {
    handleChange(value, option) {
      const {
        data: {
          attrs: { mapPosition },
        },
      } = option;
      this.$emit("change", { ...value, mapPosition });
    },
  },
};
</script>
