<template>
  <a-form :form="form">
    <a-form-item
      label="用户名"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'username',
          {
            initialValue: row.username || '',
            rules: [{ required: true, message: '请输入用户名' }],
          },
        ]"
        placeholder="请输入用户名"
      />
    </a-form-item>
    <a-form-item v-if="!row.id"
      label="密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :extra="extra"
    >
      <a-input-password
        v-decorator="[
          'password',
          {
            initialValue: row.password || '',
            rules: [{ required: true, validator: this.passwordValidator }],
          },
        ]"
        placeholder="请输入密码"
        :disabled="row.id"
      />
    </a-form-item>
    <a-form-item
      label="真实姓名"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'trueName',
          {
            initialValue: row.trueName,
            rules: [{ required: true, message: '请输入姓名' }],
          },
        ]"
        placeholder="请输入姓名"
      />
    </a-form-item>
    <a-form-item
      label="角色"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectUserType
        v-decorator="[
          'userType',
          {
            initialValue: row.userType || 2,
            rules: [{ required: true, message: '请选择角色' }],
          },
        ]"
        @change="handleIndustrySelectChange"
      ></SelectUserType>
    </a-form-item>
    <a-form-item
      label="单位"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectCompany
        v-decorator="[
          'projectIds',
          {
            initialValue: row.projectIds || [],
            rules: [{ required: true, message: '请选择单位' }],
          },
        ]"
        @change="handleCompanySelectChange"
        :multiple="true"
      ></SelectCompany>
    </a-form-item>
    <a-form-item
      label="手机号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'phone',
          {
            initialValue: row.phone || '',
            rules: [{ required: true, message: '请输入手机号' }],
          },
        ]"
        placeholder="请输入手机号"
      />
    </a-form-item>
  </a-form>
</template>

<script>
import SelectUserType from "@/components/common/SelectUserType.vue";
import SelectCompany from "@/components/common/SelectCompany.vue";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

// 密码必须有数字、大写、小写、特殊字符组成, 长度不能小于6
const pwdRegex = new RegExp(
  /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6}/
);

export default {
  name: "user-form-com",

  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  components: {
    SelectUserType,
    SelectCompany
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
    handleIndustrySelectChange(val) {
      this.form.setFieldsValue({ userType: val });
    },

    handleCompanySelectChange(val) {
      console.log('-----handleCompanySelectChange', val);
      this.form.setFieldsValue({ projectIds: val });
    },

        // 自定义密码验证
    passwordValidator(rule, value, callback) {
      let message = undefined;
      if (!value.length) {
        message = "请输入密码";
      }
      if (value.length < 6) {
        message = "密码长度不能小于6";
      }
      if (!pwdRegex.test(value)) {
        message = "密码必须由大小写字母、数字、特殊字符组成";
      }
      callback(message);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
