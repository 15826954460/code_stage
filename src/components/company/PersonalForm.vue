<template>
  <a-form class="personal-form-container" :form="form">
    <a-form-item
      label="姓名"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'projectName',
          {
            initialValue: row.projectName || '',
            rules: [{ required: true, message: '请输入姓名' }],
          },
        ]"
        placeholder="请输入公司名称"
      />
    </a-form-item>
    <a-form-item
      label="联系电话"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'contactInfo',
          {
            initialValue: row.contactInfo || '',
            rules: [{ required: true, message: '请输入联系电话' }],
          },
        ]"
        placeholder="请输入联系电话"
      />
    </a-form-item>
    <a-form-item
      label="身份证号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'idCard',
          {
            initialValue: row.idCard || '',
            rules: [{ required: true, message: '请输入身份证号' }],
          },
        ]"
        placeholder="请输入身份证号"
      />
    </a-form-item>
    <a-form-item
      label="家庭住址"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'address',
          {
            initialValue: row.address || '',
            rules: [{ required: true, message: '请输入家庭住址' }],
          },
        ]"
        placeholder="请输入家庭住址"
      />
    </a-form-item>
    <a-form-item
      label="行业"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <IndustryList
        v-decorator="[
          'businessId',
          {
            initialValue: row.businessId || '',
            rules: [{ required: true, message: '请选择行业' }],
          },
        ]"
        @change="handleIndustrySelectChange"
      ></IndustryList>
    </a-form-item>
    <a-form-item
      label="所属省份"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- TODO: 下拉框 -->
    </a-form-item>
    <a-form-item
      label="经纬度"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- TODO: 地图 -->
    </a-form-item>
  </a-form>
</template>

<script>
import IndustryList from "@/components/common/IndustryList.vue";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "personal-form-com",

  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  components: {
    IndustryList
  },

  beforeDestroy() {
    this.form.resetFields();
  },

  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    };
  },

  methods: {
    handleIndustrySelectChange(val) {
      this.form.setFieldsValue({ businessId: val });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
