<template>
  <div class="map-position-box">
    <map-com :isAddUser="true" :zoom="10"></map-com>
  </div>
</template>

<script>
import MapCom from "@/components/common/Map.vue";

export default {
  name: '',

  data() {
    return {}
  },

  components: {
    MapCom
  },

  created() {},

  mounted() {},

  methods: {}
}
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
