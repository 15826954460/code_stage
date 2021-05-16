<template>
  <a-form class="company-form-container" :form="form">
    <a-form-item
      label="公司名称"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'projectName',
          {
            initialValue: row.projectName || '',
            rules: [{ required: true, message: '请输入公司名称' }],
          },
        ]"
        placeholder="请输入公司名称"
      />
    </a-form-item>
    <a-form-item
      label="公司地址"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'address',
          {
            initialValue: row.address || '',
            rules: [{ required: true, message: '请输入公司地址' }],
          },
        ]"
        placeholder="请输入公司地址"
      />
    </a-form-item>
    <a-form-item
      label="营业地址"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'workAddress',
          {
            initialValue: row.workAddress || '',
            rules: [{ required: true, message: '请输入营业地址' }],
          },
        ]"
        placeholder="请输入营业地址"
      />
    </a-form-item>
    <a-form-item
      label="所属省份"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- TODO: 下拉框， 地区列表 --> 
    </a-form-item>
    <a-form-item
      label="经纬度"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- TODO: 地图 -->
    </a-form-item>
    <a-form-item
      label="纳税号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'taxFileNumber',
          {
            initialValue: row.taxFileNumber || '',
            rules: [{ required: true, message: '请输入纳税号' }],
          },
        ]"
        placeholder="请输入纳税号"
      />
    </a-form-item>
    <a-form-item
      label="开户行"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectBank
        v-decorator="[
          'bank',
          {
            initialValue: row.bank || '',
          },
        ]"
        @change="handleTypeSelectChange"
      ></SelectBank>
    </a-form-item>
    <a-form-item
      label="银行卡号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'cardNumber',
          {
            initialValue: row.cardNumber || '',
            rules: [{ required: true, message: '请输入银行卡号' }],
          },
        ]"
        placeholder="请输入银行卡号"
      />
    </a-form-item>
    <!-- <a-form-item
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
    </a-form-item> -->
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
      label="公司联系人"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      extra="多个联系人以逗号隔开 eg：张三: 123456; 李四: 123456"
    >
      <a-textarea
        v-decorator="[
          'contactInfo',
          {
            initialValue: row.contactInfo || '',
            rules: [{ required: true, message: '请输入公司联系人' }],
          },
        ]"
        placeholder="请输入公司联系人"
        :autoSize="{ required: true, minRow: 1 }"
      />
    </a-form-item>
    <a-form-item
      label="官网地址"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'website',
          {
            initialValue: row.website || '',
            rules: [{ message: '请输入官网地址' }],
          },
        ]"
        placeholder="请输入官网地址"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import SelectBank from "@/components/common/SelectBank.vue";
import IndustryList from "@/components/common/IndustryList.vue";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "CompanyFormCom",

  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  components: {
    SelectBank,
    IndustryList,
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
    handleTypeSelectChange(val) {
      this.form.setFieldsValue({ bank: val });
    },

    handleIndustrySelectChange(val) {
      this.form.setFieldsValue({ businessId: val });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
