<template>
  <div class="device-total">
    <h3>设备统计</h3>
    <b class="total-num">总共<span>{{ this.onlineNum +  this.offlineNum}}</span>台</b>
    <dv-active-ring-chart :config="config" style="width:300px;height:300px"/>
    <div class="online-num">在线<span class="num">{{ this.onlineNum }}</span></div>
    <div class="offline-num"><span class="num">{{ this.offlineNum }}</span>离线</div>
  </div>
</template>

<script>
import api from "@/axios/api";

export default {
  name: "deviceTotal",
  radius: '40%',
  activeRadius: '45%',
  data() {
    return {
      onlineNum:0,  // 在线
      offlineNum:0,  //离线
      config: {
        data: [],
        color: [
          "#FF5D1D",
          "#FFA91F",
          "#FFF803",
          "#9DF90D",
          "#11EA00",
          "#00FFF8",
          "#038CEA",
          "#2948FF",
          "#B283FC",
          "#A000EA",
          "#F746EA",
          "#AF1E59"
        ],
        lineWidth: 30,
        radius: "40%",  //环半径
        activeRadius: "45%",  //环半径（动态）
        center: ['50%', '50%'],
        digitalFlopStyle: {fontSize: 14},// 数字翻牌器样式 -- 圆环内数字大小
        showOriginValue: true   // 是否展示原始数据/百分比数值
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getDeviceStatistic()
    })
  },

  mounted() {},

  methods: {
    //获取设备统计
    async getDeviceStatistic(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        type:1,
      }
      const { code ,data} = await api.screen.getScreenStatistic({params});
      if (code === 200) {
        this.offlineNum= data[0];
        this.onlineNum =  data[1];
        this.config = {
          ...this.config,
          data: [
            {
              name: "在线",
              value: this.onlineNum,
            },
            {
              name: "离线",
              value: this.offlineNum,
            },
          ],
        }
      }
      this.loading = false;
    },
  }
}
</script>

<style scoped lang="scss">
.device-total{
  padding: 5%;
  color: #fff;
  h3{
    color: #fff;
    font-size: 1rem;
  }
  .total-num{
    text-align: center;
    color: #fff;
    display: block;
    font-size: 14px;
    span{
      font-size: 1.6rem;
      padding:0 5px;
      color:#1890ff;
    }
  }
  ::v-deep .dv-active-ring-chart {
    .active-ring-info{
      //top: -15%;
    }
  }
  .online-num{
    width: 100%;
    text-align: left;
    position: absolute;
    left: 8%;
    top: 39%;
  }
  .offline-num{
    width: 36%;
    text-align: left;
    position: absolute;
    right: -12%;
    bottom: 28%;
  }
  .num{
    font-weight: bold;
    font-size: 1rem;
    margin: 0 2%;
  }
}
</style>