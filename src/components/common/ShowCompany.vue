<template>
  <div class="company-show-container">
    {{ projectName }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "show-company-com",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    ...mapState(["companyList"]),

    projectName() {
      let __projectName = "";
      this.companyList.forEach(({ id, projectName }) => {
        if (id === Number(this.value)) {
          __projectName = projectName;
        }
      });
      return __projectName;
    },
  },

  mounted() {
    this.getCompanyList();
  },

  methods: {
    ...mapActions(["getCompanyListAct"]),

    async getCompanyList() {
      if (this.companyList.length) return;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
