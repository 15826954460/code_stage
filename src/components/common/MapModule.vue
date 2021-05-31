<template>
  <a-modal
    :visible="visible"
    :centered="true"
    :closable="true"
    :width="width"
    :title="title"
    style="height: 600px"
  >
    <MapCom></MapCom>
  </a-modal>
</template>

<script>
import MapCom from "@/components/common/Map.vue";

export default {
  name: "map-model",

  props: {
    title: {
      type: String,
      default: "选择地理位置",
    },
    width: {
      type: Number,
      default: 520,
    },
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {};
  },

  components: {
    MapCom
  },

  created() {},

  mounted() {},

  methods: {},
};
</script>

<style lang='scss' scoped>
</style>
