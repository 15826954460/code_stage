<template>
  <div class="industry-show-container">
    <span v-for="(item, index) in bankList" :key="index" v-show="Number(value) === item.value">
      {{ item.label }}
    </span>
  </div>
</template>

<script>
import { BANK_LIST } from "@/constant";

export default {
  name: "show-bank-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  data() {
    return {
      bankList: BANK_LIST,
    };
  },
};
</script>
