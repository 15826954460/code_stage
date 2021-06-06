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
      :geoName="item.label"
      :geoCoord="item.geoCoord"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { GEO_COORD } from "@/constant";
import { mapMutations } from "vuex";

export default {
  name: "select-province-com",

  props: {
    value: {
      type: [Number, String],
      default: "",
    },
  },

  data() {
    return {
      geocoordList: GEO_COORD,
    };
  },

  methods: {
    ...mapMutations(["uedateMapCenter", "updateLatlng"]),

    handleChange(val, option) {
      const {
        data: {
          attrs: { geoName, geoCoord },
        },
      } = option;
      this.uedateMapCenter(geoName);
      this.updateLatlng({
        lng: geoCoord[0],
        lat: geoCoord[1],
      });
      // console.log(val, geoName, geoCoord);
      this.$emit("change", val);
    },
  },
};
</script>
