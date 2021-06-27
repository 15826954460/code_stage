<template>
  <a-select
    class="company-select-container"
    :value="value"
    placeholder="请选择单位"
    @change="handleChange"
    :mode="multiple ? 'multiple' : ''"
    :allowClear="multiple"
    :disabled="disabled"
  >
    <a-select-option
      v-for="item in buildList"
      :value="Number(item.id)"
      :key="item.id"
    >
      {{ item.buildingName }}
    </a-select-option>
  </a-select>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { COMPANY_TYPE } from "@/constant";

export default {
  name: "select-buind-com",

  props: {
    value: {
      type: [String, Number, Array],
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(["buildList", "mapMutations"]),
  },

  mounted() {
    this.init();
  },

  methods: {
    ...mapMutations(["updateBuildList"]),

    ...mapActions(["getAllBuildListAct"]),

    handleChange(value) {
      this.$emit("change", value);
    },

    init() {
      if (this.buildList.length > 0) return;
      this.getAllBuildListAct();
    },
  },
};
</script>
