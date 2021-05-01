<template>
  <a-modal
    :title="isShowLogin ? '' : '注册'"
    :visible="visible"
    centered
    :isShowClose="isShowClose"
    :closable="closable"
    :footer="null"
    :maskStyle="maskStyle"
    :bodyStyle="{ ...bodyStyle, padding: isShowLogin ? '40px' : '20px' }"
    :width="isShowLogin ? 450 : 520"
  >
    <Login
      v-if="isShowLogin"
      @loginRegisterSwitch="loginRegisterSwitch"
    ></Login>
    <Register v-else @loginRegisterSwitch="loginRegisterSwitch" @cancel="loginRegisterSwitch"></Register>
  </a-modal>
</template>

<script>
import Login from "@/components/common/Login.vue";
import Register from "@/components/common/Register.vue";

export default {
  name: "login-and-register-com",

  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    isShowClose: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    maskStyle: {
      type: Object,
      default: () => {
        return {
          backgroundColor: "#f5f5f5"
        };
      }
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {
          padding: "40px"
        };
      }
    }
  },

  data() {
    return {
      isShowLogin: true
    };
  },

  components: {
    Login,
    Register
  },

  mounted() {},

  methods: {
    loginRegisterSwitch(bool) {
      this.isShowLogin = bool;
    },

    visibleChange(bool) {
      this.$emit('changeLoginAndRegisterShow', bool);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
