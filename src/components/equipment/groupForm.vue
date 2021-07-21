<template>
  <a-form class="group-form-container" :form="form">
    <a-form-item label="">
      <a-input
          v-decorator="[
          'groupName',
          {
            initialValue: row.groupName || '',
            rules: [{ required: true, message: '请输入分组名称' }],
          },
        ]"
          placeholder="请输入分组名称"
      />
    </a-form-item>

  </a-form>
</template>

<script>
export default {
  name: "group-form-com",

  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  components: {
  },

  data() {
    return {
      form: this.$form.createForm(this),
    };
  },

  beforeDestroy() {
    this.form.resetFields();
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.ant-form{
  padding: 40px 40px 10px;
}
</style>
