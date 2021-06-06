<template>
  <div class="map-position-box">
    <map-com :isAddUser="true" :zoom="8" @selectPos="selectPos"></map-com>
  </div>
</template>

<script>
import MapCom from "@/components/common/Map.vue";

export default {
  name: "map-position-com",

  data() {
    return {};
  },

  components: {
    MapCom,
  },

  mounted() {},

  methods: {
    selectPos(point) {
      const { lng, lat } = point;
      this.$emit("setFormValue", `${lng},${lat}`);
      this.$emit("updateShowMapSelect", false);
    },
  },
};
</script>

<style lang='scss' scoped>
.map-position-box {
  position: fixed;
  z-index: 9999 !important;
  top: 0;
  left: 200px;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
