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
      v-for="item in showCompanyList"
      :value="Number(item.id)"
      :key="item.id"
    >
      {{ item.projectName }}
    </a-select-option>
    <a-select-option :value="1"> {{ "释格" }}--{{ "总公司" }} </a-select-option>
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
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(["allCompanyList"]),

    showCompanyList() {
      return this.allCompanyList.map(({ id, projectName, type }) => {
        return { projectName, id, label: COMPANY_TYPE[type] };
      });
    },
  },

  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>
