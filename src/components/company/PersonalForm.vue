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
        placeholder="请输入姓名"
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
      <SelectGeoCood
        v-decorator="[
          'areaCode',
          {
            initialValue: { key: row.areaCode || '' },
            rules: [{ required: true, message: '请选择省份' }],
          },
        ]"
        @change="handleGeoCoordSelectChange"
      ></SelectGeoCood>
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
            rules: [{ required: true, message: '请选择开户行' }],
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
  </a-form>
</template>

<script>
import IndustryList from "@/components/common/IndustryList.vue";
import SelectGeoCood from "@/components/common/SelectGeoCood.vue";
import SelectBank from "@/components/common/SelectBank.vue";

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
    IndustryList,
    SelectGeoCood,
    SelectBank
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

    handleGeoCoordSelectChange({ key, label, mapPosition }) {
     this.form.setFieldsValue({ areaCode: { key } });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
