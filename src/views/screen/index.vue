<template>
  <div class="screen-page">
    <div class="top">
      <dv-decoration-10  class="flex-b"/>
      <div class="flex-b top-con">
        <dv-decoration-8 :color="['#568aea', '#000000']"  class="top-con-b"/>
        <div class="title">
          <span class="title-text">设备可视化平台</span>
          <dv-decoration-6 class="title-b" :reverse="true" :color="['#50e3c2', '#67a1e5']"/>
        </div>
        <dv-decoration-8 :reverse="true" :color="['#568aea', '#000000']" class="top-con-b top-con-b-r"/>
      </div>
      <dv-decoration-10 style="transform: rotateY(180deg);" class="flex-b"/>
      <div class="time">{{curData}}</div>
    </div>

    <div class="container" :style="{ height: clientHeight -100  + 'px' }">
      <div class="item con-l">
        <div class="item-con" :style="{ height: (clientHeight -140)/2  + 'px' }">
          <dv-border-box-10 class="part">
            <dv-border-box-8>
            <deviceTotal></deviceTotal>
            </dv-border-box-8>
          </dv-border-box-10>
        </div>
        <div class="item-con" :style="{ height: (clientHeight -140)/2  + 'px' }">
          <dv-border-box-10 class="part" >
            <dv-border-box-8>
              <deviceType></deviceType>
            </dv-border-box-8>
          </dv-border-box-10>
        </div>
      </div>

      <div class="item con-c" >
<!--        <div class="video-box" >
          <video muted src="../../assets/image/screen/4dab01b9e86d7d639762753798121cd3.mp4" autoplay loop></video>
        </div>-->
        <dv-border-box-1 class="con-c-list">
          <deviceList></deviceList>
        </dv-border-box-1>

      </div>

      <div class="item con-r">
        <div class="item-con" :style="{ height: (clientHeight -140)/2  + 'px' }">
          <dv-border-box-10 class="part">
            <perfectnessRate></perfectnessRate>
          </dv-border-box-10>
        </div>
        <div class="item-con" :style="{ height: (clientHeight -140)/2  + 'px' }">
          <dv-border-box-10 class="part" >
            <warinList></warinList>
          </dv-border-box-10>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import deviceList from "@/components/screen/deviceList.vue";
import deviceTotal from "@/components/screen/deviceTotal.vue";
import perfectnessRate from "@/components/screen/perfectnessRate.vue";
import warinList from "@/components/screen/warinList.vue";
import deviceType from "@/components/screen/deviceType.vue";
export default {
  name: 'screenPage',
  components:{deviceList,deviceTotal,perfectnessRate,warinList,deviceType},
  data() {
    return {
      curData:moment().format("YYYY-MM-DD  h:mm:ss dddd"),
      clientHeight: document.body.clientHeight, //屏幕可视高度
    }
  },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.clientHeight = window.screenHeight
      })()
    }
  },
  watch: {
    clientHeight(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.clientHeight = val
        this.timer = true
        let that = this
        setTimeout(function() {
          // 打印screenWidth变化的值
          console.log(that.clientHeight)
          that.timer = false
        }, 400)
      }
    }
  },
  computed: {},
  created() {},
  methods: {

  }
}
</script>

<style scoped lang="scss">
.screen-page{
  width: 100%;
  height: 100vh;
  background: linear-gradient(#010C27 75%, #0C2759);
  //background-image: url("../../assets/image/screen/bg.png");
  //background-size: cover;
  //background-position: center center;
  overflow: hidden;
  color: #fff;
  .top{
    height: 60px;
    text-align: center;
    line-height: 60px;
    display: flex;
    position: relative;
    z-index: 1;
    margin-bottom: 40px;
    .flex-b{
      flex:0 0 27% !important;
    }
    .top-con{
      flex: 1 !important;
      position: relative;
      .top-con-b{
        width: 26%;
        height: 30px;
        position: absolute;
        top: 30px;
        &.top-con-b-r{
          right: 0;
        }
      }
    }
    .title{
      color: #fff;
      .title-b{
        width: 35%;
        height: 10px;
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
      .title-text{
        font-size: 1.6rem;
        display: inline-block;
        padding-top: 10px;
      }
    }
    .time{
      font-size: 1.2rem;
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
  .container{
    display: flex;
    .con-l,.con-r{
      width: 22%;
      min-width: 364px;
      padding:0 1.5%;
      z-index: 2;
      .item-con{
        margin-bottom: 20px;
      }
    }
    .con-c{
      flex: 1;
      margin-bottom: 20px;
      display: flex;
      height: 100%;
      flex-flow: row wrap;
      .video-box{
        width: 100%;
        height: 100%;
        text-align: center;
        position: absolute;
        top: -12%;
        left: 0;
        z-index: 0;
        flex: 1 0 auto;
        video{
          width: 78%;
          height: 100%;
        }
      }
      .con-c-list{
        height: 100%;
        align-self: flex-end;
        margin-bottom: 20px;
      }
      //@media only screen and (max-width: 1200px) {
      //  .con-c-list {height: 360px;}
      //}
      //@media only screen and (max-width: 1300px) {
      //  .con-c-list {height: 335px;}
      //}
      //@media screen and (max-width: 1600px) and (min-width: 1300px) {
      //  .con-c-list {height: 300px;}
      //}
    }
  }
}
</style>