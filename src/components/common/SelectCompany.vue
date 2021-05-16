<template>
  <a-select
    class="company-select-container"
    :value="value && Number(value)"
    placeholder="请选择单位"
    @change="handleChange"
  >
    <a-select-option
      v-for="item in showCompanyList"
      :value="Number(item.id)"
      :key="item.id"
    >
      {{ item.projectName }}
    </a-select-option>
  </a-select>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "select-company-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    ...mapState(["companyList"]),

    showCompanyList() {
      return this.companyList.map(({ id, projectName }) => {
        return { projectName, id };
      });
    },
  },

  mounted() {
    this.getCompanyList();
  },

  methods: {
    ...mapActions(["getCompanyListAct"]),

    async getCompanyList() {
      if (this.companyList.length) return;
      this.getCompanyListAct();
    },

    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
