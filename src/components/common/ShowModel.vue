
<template>
  <div class="industry-show-container">
    <span
      v-for="(item, index) in modelIdList"
      :key="index"
      v-show="Number(value) === item.id"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapMutations: mapMutationsConfig,
  mapActions: mapActionsConfig,
  mapState: mapStateConfig
} = createNamespacedHelpers("config");

export default {
  name: "show-category-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    ...mapStateConfig({
      modelIdList: (state) => state.config.modelIdList,
    }),
  },
};
</script>
