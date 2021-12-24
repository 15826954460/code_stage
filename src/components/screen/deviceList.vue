<template>
  <div class="list">
    <ul class="t-head">
      <li>ID</li>
      <li>设备名称</li>
      <li>设备型号</li>
      <li>温度</li>
      <li>湿度</li>
      <li>气压</li>
      <li>时间</li>
    </ul>
    <vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="classOption" >
      <ul class="t-body" v-for="(item,index) in listData" :key="index">
<!--          <li>{{ index + 1}}</li>-->
          <li>{{  item.id || '--'}}</li>
          <li>{{ item. deviceName || '--'}}</li>
          <li>{{ item. modelName || '--'}}</li>
          <li>{{ item. v1 || '--' }}</li>
          <li>{{ item. v2 || '--'}}</li>
          <li>{{ item. v3 || '--'}}</li>
          <li>{{ item. addTime || '--'}} </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import api from "@/axios/api";
import vueSeamlessScroll from 'vue-seamless-scroll'
import moment from "moment";
export default {
  name: "deviceList",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      listData:[]
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
        waitTime: 2000 // 单步运动停止的时间(默认值1000ms)
      }
    },
  },
  created() {
    this.$nextTick(() => {
      this.getDeviceList()
    })
  },
  methods: {
    //获取设备实时数据
    async getDeviceList(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        limit:30,
      }
      const { code ,data} = await api.screen.getScreenList({params});
      if (code === 200) {
        this.listData = data;
      }
      this.loading = false;
    },
  }
}
</script>

<style scoped lang="scss">
.list {
  flex: 1;
  padding: 10px 15px;
  color: #fff;
  .t-head, .t-body {
    display: flex;

    li {
      flex: 1;
      text-align: center;
    }

    li:nth-child(1) {
      flex:0 0 30px;
      height: 30px;
    }
  }

  .t-head {
    height: 40px;
    line-height: 40px;
    /*background-color: rgba(24, 144, 255, 0.5);*/
    background: linear-gradient(to left, rgba(24, 144, 255, 0), rgba(24, 144, 255, 0.6),rgba(24, 144, 255, 0));
    border-radius: 10px 10px 0 0;
  }

  .seamless-warp {
    border-radius: 0 0 5px 5px;
    //height: calc(100% - 140px);
    overflow: hidden;
  }
}

</style>