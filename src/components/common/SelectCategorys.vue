<template>
  <a-select
    class="bank-container"
    :value="value && Number(value)"
    placeholder="请选择检测类别"
    @change="handleChange"
  >
    <a-select-option
      v-for="item in categorysList"
      :value="Number(item.id)"
      :key="item.id"
    >
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapMutations: mapMutationsConfig,
  mapActions: mapActionsConfig,
  mapState: mapStateConfig
} = createNamespacedHelpers("config");

export default {
  name: "select-category-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    ...mapStateConfig({
      categorysList: (state) => state.config.categorysList,
    }),
  },

  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>
