<template>
  <div class="index-container">
    <h3 class="title p15">数据分析
      <a-tooltip placement="left" title="全屏" arrow-point-at-center>
        <a-icon :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'" class="full-screen-icon" @click="screen()"/>
      </a-tooltip>
    </h3>
    <div class="top">
      <router-link to='/user-manage' class="top-item">
        <b class="num">{{ userSum || 0 }}</b>
        <p class="text">用户总数</p>
      </router-link>
      <router-link to='/equipment-page' class="top-item">
        <b class="num">{{ deviceSum || 0 }}</b>
        <p class="text">设备总数</p>
      </router-link>
      <router-link to='/equipmentList' class="top-item">
        <b class="num">{{deviceTypeNum || 0 }}</b>
        <p class="text">设备类别</p>
      </router-link>
      <router-link to='/warning' class="top-item">
        <b class="num">{{warnNum || 0 }}</b>
        <p class="text">实时警报总数</p>
      </router-link>
    </div>

    <div class="container" v-if="conHeight && conHeight.height">
        <piePanel :style="conHeight" class="con-chart"></piePanel>
        <newUserPanel :style="conHeight" class="con-chart"></newUserPanel>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import piePanel from '@/components/index/piePanel'
import newUserPanel from '@/components/index/newUserPanel'
import {mapActions, mapState, createNamespacedHelpers, mapMutations} from "vuex";

import sessionStorage from "@/utils/session-storage";
import { TOKEN, USER_INFO } from "@/constant";
const {
  mapState: mapStateUser,
  mapMutations: mapMutationsUser,
} = createNamespacedHelpers("user");
export default {
  name: "home",
  data() {
    return {
      userSum:'',
      deviceSum:'',
      deviceTypeNum:'',
      warnNum:'',
      conHeight:{
        height:''
      },
      fullscreen: false,
    };
  },
  components: {piePanel,newUserPanel},
  created() {
    window.addEventListener('resize', this.getHeight);
    const token = sessionStorage.get(TOKEN);
    const userInfo = sessionStorage.get(USER_INFO);
    this.updateLogin(token ? true : false);
    this.updateUserInfo(TOKEN && userInfo ? userInfo : {});
    this.getUserNum();
    this.getDeviceNum();
    this.getDeviceTypeNum();
    this.getWarnNum();
    setTimeout(() => {
      this.getHeight();
    },300)
  },
  methods: {

    ...mapMutations(["updateLogin"]),
    ...mapMutationsUser(["updateUserInfo"]),
    //用户总数
    async getUserNum(params = {}) {
      this.loading = true;
      const { code, data,count } = await api.user.getUserList();
      if (code === 200) {
        this.userSum = count;
      }
      this.loading = false;
    },
    //设备总数
    async getDeviceNum(params = {}) {
      this.loading = true;
      const { code, data,count } = await api.equipment.getEquipmentList();
      if (code === 200) {
        this.deviceSum = count;
      }
      this.loading = false;
    },
    //获取设备类型总数
    async getDeviceTypeNum(force = true) {
      this.loading = false;
      const { code, data} = await api.common.getConfig();
      if (code === 200) {
        this.deviceTypeNum = data.models.length;
      }
      this.loading = false;
    },
    //获取警报总数
    async getWarnNum(force = true) {
      this.loading = true;
      const { code ,data,count} = await api.system.getEventTypeList();
      if (code === 200) {
        this.warnNum = count;
      }
      this.loading = false;
    },

    //获取高度
    getHeight() {
      this.conHeight.height = (window.innerHeight - 150)/2 + 'px';
    },

    screen(){
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
}
</script>


<style  lang="scss" scoped>
.index-container{
  padding:0 10px;
  .title{
    height: 45px;
    line-height: 45px;
    margin: 0;
    position: relative;
    .full-screen-icon{
      font-size: 26px;
      color: #666;
      font-weight: bold;
      position: absolute;
      right: 1%;
      top: 50%;
      margin-top: -13px;
      cursor: pointer;

      &:hover{
        color: #1890ff;
      }
    }
  }
  .top{
    display:flex;
    flex-direction: row;
    color: #fff;
    margin-bottom: 15px;
    .top-item{
      color: #fff;
      height:90px;
      flex:1;
      background-color:rgb(24, 144, 255,0.8);
      padding: 10px;
      position: relative;
      border-radius: 5px;
      .num{
        display: inline-block;
        font-size: 24px;
        margin: 0px 0 4px;
      }
    }
    .top-item:before{
      content: '';
      width: 64px;
      height: 64px;
      background: url("../../assets/image/home/bars.png") no-repeat;
      background-size: contain;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -32px;
    }
    .top-item:not(:first-child){
      margin-left:20px;
    }
  }
  .container{
    width: 100%;
    .con-chart{
      display: flex;
      flex-direction: row;
    }
  }
}
</style>
