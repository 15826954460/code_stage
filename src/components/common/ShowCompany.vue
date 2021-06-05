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
    ...mapState(["allCompanyList"]),

    projectName() {
      let __projectName = "";
      const __allCompanyList = [
        ...this.allCompanyList,
        {
          id: 1,
          projectName: "释格物流",
        },
      ];
      __allCompanyList.forEach(({ id, projectName }) => {
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
      if (this.allCompanyList.length) return;
      this.getCompanyListAct({ isAll: true });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
