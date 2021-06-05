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
      v-if="type === 1"
      label="上级公司"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      extra="非必选, 默认为释格有限公司"
    >
      <SelectCompany
        v-decorator="[
          'parentId',
          {
            initialValue: row.parentId || 1,
            rules: [{ required: true, message: '请选择上级公司' }],
          },
        ]"
        @change="handleCompanySelectChange"
        :disabled="true"
      ></SelectCompany>
    </a-form-item>
    <a-form-item
      label="所在省份"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectGeoCood
        v-decorator="[
          'areaCode',
          {
            initialValue: row.areaCode,
            rules: [{ required: true, message: '请选择省份' }],
          },
        ]"
        @change="handleGeoCoordSelectChange"
      ></SelectGeoCood>
    </a-form-item>

    <a-form-item
      label="地理位置"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-row :gutter="12">
        <a-col class="gutter-row" :span="12">
          <a-input
            v-decorator="[
              'mapPosition',
              {
                initialValue: row.mapPosition,
                rules: [{ required: true, message: '请选择地理位置' }],
              },
            ]"
            placeholder="请选择地理位置"
          />
        </a-col>
        <a-col class="gutter-row" :span="12">
          <a-button @click="selectMapPosition">选择地理位置</a-button>
        </a-col>
      </a-row>
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
import { mapMutations } from "vuex";
import SelectBank from "@/components/common/SelectBank.vue";
import IndustryList from "@/components/common/IndustryList.vue";
import SelectGeoCood from "@/components/common/SelectGeoCood.vue";
import SelectCompany from "@/components/common/SelectCompany.vue";

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

    type: {
      type: Number,
      default: 1,
    },
  },

  components: {
    SelectBank,
    IndustryList,
    SelectGeoCood,
    SelectCompany,
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
    ...mapMutations(["uedateMapCenter"]),

    handleTypeSelectChange(val) {
      this.form.setFieldsValue({ bank: val });
    },

    handleIndustrySelectChange(val) {
      this.form.setFieldsValue({ businessId: val });
    },

    handleGeoCoordSelectChange(val) {
      this.form.setFieldsValue({ areaCode: val });
    },

    handleCompanySelectChange(val) {
      this.form.setFieldsValue({ parentId: val });
      this.uedateMapCenter(val);
    },

    selectMapPosition() {
      this.$emit('updateShowMapSelect', true)
    }
  },
};
</script>
