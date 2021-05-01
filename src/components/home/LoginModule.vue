<template>
  <a-modal
    centered
    :closable="false"
    :key="false"
    :isCenter="true"
    :isShowFooterBorder="false"
    :maskClosable="false"
    :width="400"
    v-model="visible"
    id="border-none"
  >
    <template slot="footer">
      <a-button type="primary" style="width: 100%" @click="okHandle">
        确定
      </a-button>
    </template>
    <Login ref="loginRef"></Login>
  </a-modal>
</template>

<script>
import Login from "@/components/common/Login.vue";
export default {
  name: "LoginModule",
  props: {
    visible: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Login,
  },
  data() {
    return {};
  },
  methods: {
    okHandle() {
      const loginRef = this.$refs.loginRef;
      loginRef.submit();
    }
  }
};
</script>

<style scoped lang="scss">
#border-none {
  ::v-deep .ant-modal-body {
    padding-bottom: 0;
  }

  ::v-deep .ant-modal-footer {
    border: none;
  }
}
</style>
