<template>
  <a-form class="building-form-container" :form="form">
    <a-form-item
      label="建筑名称"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'buildingName',
          {
            initialValue: row.buildingName || '',
            rules: [{ required: true, message: '请输入建筑名称' }],
          },
        ]"
        :disabled="onlyShow"
        placeholder="请输入建筑名称"
      />
    </a-form-item>
    <a-form-item
      label="建筑楼层"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'floor',
          {
            initialValue: row.floor || '',
            rules: [{ required: true, message: '请输入楼层' }],
          },
        ]"
        :disabled="onlyShow"
        placeholder="请输入楼层"
      />
    </a-form-item>
    <a-form-item
      label="所属单位"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectCompany
        v-decorator="[
          'projectId',
          {
            initialValue: row.projectId || '',
            rules: [{ required: true, message: '请选择所属单位' }],
          },
        ]"
        :disabled="onlyShow"
        @change="handleSelectChange"
      ></SelectCompany>
    </a-form-item>
  </a-form>
</template>

<script>
import SelectCompany from "@/components/common/SelectCompany.vue";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "building-form-com",

  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
    onlyShow: {
      type: Boolean,
      default: false,
    }
  },

  components: {
    SelectCompany,
  },

  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    };
  },

  beforeDestroy() {
    this.form.resetFields();
  },

  methods: {
    handleSelectChange(val) {
      this.form.setFieldsValue({ projectId: val });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
