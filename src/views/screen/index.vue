<template>
  <div class="screen-page" id="con_lf_top_div">
    <div class="top">
      <h3 class="title">设备可视化平台</h3>
      <div class="time">{{curData}}</div>
      <a-icon :type="isFullscreen?'fullscreen-exit':'fullscreen'"  @click="handleFullScreen"  class="full-screen"/>
    </div>
    <div class="content">
      <ul class="t-head">
        <li>设备名称</li>
        <li>设备类型</li>
        <li>地址</li>
        <li>关联建筑</li>
        <li>温度</li>
        <li>湿度</li>
        <li>气压</li>
        <li>状态</li>
        <li>警报类型</li>
        <li>警报内容</li>
        <li>时间</li>
      </ul>
      <vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="classOption" :style="{height: scrollerHeight}">
        <ul class="t-body" v-for="(item,index) in listData" :key="index">
          <li>{{ item. deviceName}}</li>
          <li>{{ item. modelName}}</li>
          <li>{{ item. address}}</li>
          <li>{{ item. buildingName}}</li>
          <li>{{ item. temp}}</li>
          <li>{{ item. hum}}</li>
          <li>{{ item. pre}}</li>
          <li>
            <span v-if="item.status = 1">正常</span>
            <span v-else-if="item.status = 0"  class="red-text">异常</span>
          </li>
          <li :class="item.status = 0 ? 'red-text' : 'green-text'">{{ item. rname}}</li>
          <li :class="item.status = 0 ? 'red-text' : 'green-text'">{{ item. msg}}</li>
          <li>{{ item. time}}</li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="footer">《释格物联使用许可》，沪公网安备沪ICP备15035311号-1</div>
  </div>
</template>

<script>
import moment from 'moment'
import vueSeamlessScroll from 'vue-seamless-scroll'
import screenfull from 'screenfull'

const listData = [];
for (let i = 0; i < 16; i++) {
  listData.push({
    deviceName: '无线水浸报警器',
    modelName: `无线水浸AN-217`,
    address: '湖北省武汉市保利花园10栋',
    buildingName: `test-${i}`,
    temp:'31℃',
    hum:'44.3RH%',
    pre:'98.98Pa',
    status:1,
    rname:'低电量',
    msg:'规则名称=>规则名称（低电量）',
    time:'2021-07-06 16:10:15'
  });
}

export default {
  name: 'screenPage',
  components: {vueSeamlessScroll,screenfull},
  data() {
    return {
      curData:moment().format("YYYY-MM-DD  h:mm:ss dddd"),
      listData,
      isFullscreen: false,
    }
  },
  computed: {
    classOption () {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    },
    scrollerHeight: function() {
      return (window.innerHeight - 160) + 'px';
    }
  },
  created() {
    document.addEventListener("keypress", function(e) {
      if (e.keyCode === 116) {
        console.log('我弹起了');
        this.isFullscreen = true
      }
    }, false);
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    handleFullScreen() {
      if (!screenfull.isEnabled) {
        this.$message.info("您的浏览器版本过低，不支持全屏浏览");
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.change);
      }
    },
  },
}
</script>

<style scoped lang="scss">
.screen-page{
  color: #d3d6dd;
  background-color: #000000;
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/image/screen/bg.png");
  background-size: cover;
  background-position: center center;
  display: flex;
  flex-direction: column;
  .top{
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: relative;
    .title{
      color: #fff;
      font-size: 24px;
      margin: 0;
    }
    .time{
      font-size: 18px;
      position: absolute;
      right: 35px;
      top: 0;
    }
    .full-screen{
      font-size: 20px;
      position: absolute;
      right: 5px;
      top: 20px;
    }
  }
  .content{
    flex: 1;
    padding: 0 8px;
    .t-head,.t-body{
      display: flex;
      li{
        flex: 1;
        text-align: center;
      }
     /* li:first-child{
        flex: 0 0 9.1%;
      }
      li:nth-child(2){
        flex: 0 0 10%;
      }
      li:nth-child(3){
        flex: 0 0 15%;
      }
      li:nth-child(4){
        flex: 0 0 12%;
      }*/
      li:nth-child(5){
        flex: 0 0 5%;
      }
      li:nth-child(6){
        flex: 0 0 5%;
      }
      li:nth-child(7){
        flex: 0 0 5%;
      }
      /*li:nth-child(8){
        flex: 0 0 5%;
      }*/
      li:nth-child(9){
        flex: 0 0 9.6%;
      }
    }
    .t-head{
      height: 40px;
      line-height: 40px;
      background-color: rgba(24, 144, 255, 0.8);
      border-radius: 5px 5px 0 0;
    }
    .seamless-warp{
      border-radius:0 0 5px 5px ;
      //height: calc(100% - 140px);
      //height: 790px;
      overflow: hidden;
    }
  }
  .footer{
    height: 40px;
    text-align: center;
  }
  .green-text{
    color: green;
  }
  .red-text{
    color: red;
  }
}
</style>