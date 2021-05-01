<template>
  <a-form :form="form">
    <a-form-item
      label="旧密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input-password
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入旧密码' }] },
        ]"
        placeholder="请输入旧密码"
        :allowClear="false"
      />
    </a-form-item>
    <a-form-item
      label="新密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      extra="包含大小写字母、数字、特殊字符,长度>=6"
    >
      <a-input-password
        v-decorator="[
          'newPassword',
          {
            rules: [{ required: true, message: '请输入新密码' }],
          },
        ]"
        placeholder="请输入新密码"
      />
    </a-form-item>
    <a-form-item
      label="确认密码"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input-password
        v-decorator="[
          'surePassword',
          { rules: [{ required: true, message: '请确认密码' }] },
        ]"
        placeholder="请确认密码"
      />
    </a-form-item>
    <div class="__flex __rfec">
      <a-button style="margin-right: 15px" @click="cancel">取消</a-button>
      <a-button type="primary" @click="submit">确认</a-button>
    </div>
  </a-form>
</template>

<script>
import api from "@/axios/api";
import sessionStorage from "@/utils/session-storage";

import { createNamespacedHelpers, mapMutations } from "vuex";
const { mapMutations: mapMutationsUser } = createNamespacedHelpers("user");

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const pwdRegex = new RegExp(
  /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{6}/
);

export default {
  name: "update-password-com",

  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    };
  },

  mounted() {
    this.form.resetFields();
  },

  methods: {
    ...mapMutations(["updateLogin", "updateToken"]),
    ...mapMutationsUser(["clearUserInfo"]),

    cancel() {
      this.$emit("cancel", false);
    },

    submit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { newPassword, surePassword, password } = values;
          if (!pwdRegex.test(newPassword)) {
            return this.$message.error("密码不符合规则,请重新输入");
          }
          if (newPassword.trim() !== surePassword.trim()) {
            this.$message.error("两次密码输入不一致");
            return;
          }
          if (newPassword.trim() === password.trim()) {
            this.$message.error("旧密码和新密码不能重复");
            return;
          }
          const { code } = await api.user.updatePassword({
            newPassword,
            oldPassword: password,
          });
          if (code === 200) {
            this.$message.success("修改密码成功,请重新登陆", 1.5);
            let __timer = setTimeout(() => {
              this.clearUserInfo();
              this.updateLogin(false);
              this.updateToken();
              sessionStorage.clear();
              clearTimeout(__timer);
              this.$emit("cancel", false);
              __timer = null;
            }, 1000);
          } else if (code === 10002) {
            this.$message.error("旧密码错误，请重新输入");
          } else {
            this.$message.error("修改密码失败，请稍后再试");
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
