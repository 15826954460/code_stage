<template>
  <div class="login-page" :visible="visible">
    <img src="../../assets/image/login/bgPic.png" alt="" class="bg-pic">
    <div class="login-con">
      <Login ref="loginRef"></Login>
      <a-button type="primary" style="width: 100%" @click="okHandle" class="btn">确定</a-button>
    </div>
<!--    <a-modal
        centered
        :closable="false"
        :key="false"
        :isCenter="false"
        :isShowFooterBorder="false"
        :maskClosable="false"
        :width="400"
        v-model="visible"
        id="border-none"
        style="display: none"
    >
      <template slot="footer">
        <a-button type="primary" style="width: 100%" @click="okHandle">
          确定
        </a-button>
      </template>
      <Login ref="loginRef"></Login>
    </a-modal>-->
    <p class="copyright">《释格物联使用许可》，沪公网安备沪ICP备15035311号-1</p>
  </div>
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
.login-page{
  width: 100%;
  height: 100vh;
  //background: linear-gradient(#032650 45%, #06347A, #095B8C, #032650 45%);
  background: url("../../assets/image/login/bg.jpg");
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .bg-pic{
    width: 33%;
    min-width: 500px;
    background-size: cover;
  }
  .login-con{
    width: 360px;
    height:400px;
    background-color: #024476;
    padding: 25px;
    border-radius: 5px;
    margin-left: -1%;
    border:3px solid #056aa0;
  }
  .btn{
    margin-top: 50px;
  }
  .copyright{
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
/*#border-none {
  ::v-deep .ant-modal-mask{
    background-color: rgba(0, 0, 0, 0.15);

  }
  ::v-deep .ant-modal-body {
    padding-bottom: 0;
  }

  ::v-deep .ant-modal-footer {
    border: none;
  }
}*/
</style>
