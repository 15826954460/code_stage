
<template>
  <div class="industry-show-container">
    <span
      v-for="(item, index) in buildList"
      :key="index"
      v-show="Number(value) === item.value"
    >
      {{ item.buildingName }}
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "show-build-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    ...mapState({
      buildList: (state) => state.buildList,
    }),
  },
};
</script>
