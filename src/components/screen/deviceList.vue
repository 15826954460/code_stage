<template>
  <div class="list">
    <ul class="t-head">
      <li>编号</li>
      <li>设备名称</li>
      <li>设备类型</li>
<!--      <li>地址</li>-->
<!--      <li>关联建筑</li>-->
      <li>温度</li>
      <li>湿度</li>
      <li>气压</li>
      <!-- <li>状态</li>
       <li>警报类型</li>
       <li>警报内容</li>
       --><li>时间</li>
    </ul>
    <vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="classOption" >
      <ul class="t-body" v-for="(item,index) in listData" :key="index">
          <li>{{ item. index}}</li>
          <li>{{ item. deviceName}}</li>
          <li>{{ item. modelName}}</li>
<!--          <li>{{ item. address}}</li>-->
<!--          <li>{{ item. buildingName}}</li>-->
          <li>{{ item. temp}}</li>
          <li>{{ item. hum}}</li>
          <li>{{ item. pre}}</li>
        <!-- <li>
          <span v-if="item.status = 1">正常</span>
          <span v-else-if="item.status = 0"  class="red-text">异常</span>
        </li>
        <li :class="item.status = 0 ? 'red-text' : 'green-text'">{{ item. rname}}</li>
        <li :class="item.status = 0 ? 'red-text' : 'green-text'">{{ item. msg}}</li>-->
         <li>{{ item. time}}</li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import moment from "moment";
const listData = [];
for (let i = 0; i < 16; i++) {
  listData.push({
    index:i+1,
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
  name: "deviceList",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      listData,
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
  },
}
</script>

<style scoped lang="scss">
.list {
  flex: 1;
  padding: 0 8px;
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
    background-color: rgba(24, 144, 255, 0.8);
    border-radius: 5px 5px 0 0;
  }

  .seamless-warp {
    border-radius: 0 0 5px 5px;
    //height: calc(100% - 140px);
    //height: 790px;
    overflow: hidden;
  }
}

</style>