<template>
  <a-select
    class="company-select-container"
    :value="value"
    placeholder="请选择单位"
    @change="handleChange"
    :mode="multiple ? 'multiple' : ''"
    :allowClear="multiple"
  >
    <a-select-option
      v-for="item in showCompanyList"
      :value="Number(item.id)"
      :key="item.id"
    >
      {{ item.projectName }}--{{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { COMPANY_TYPE } from "@/constant";

export default {
  name: "select-company-com",

  props: {
    value: {
      type: [String, Number, Array],
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(["allCompanyList"]),

    showCompanyList() {
      return this.allCompanyList.map(({ id, projectName, type }) => {
        return { projectName, id, label: COMPANY_TYPE[type] };
      });
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

    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>
