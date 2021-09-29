<template>
  <dv-border-box-8 :reverse="true" class="item-con">
    <dv-charts :option="option" style="width:100%;height:100%"/>
    <div class="rate-num"> <span>99</span>%</div>
  </dv-border-box-8>
</template>

<script>
import moment from "moment";

export default {
  name: "perfectnessRate",
  data() {
    return {
      option:{
        title: {
          text: '设备完好率',
          style: {
            fill: '#fff'
          }
        },
        series: [
          {
            type: 'gauge',
            data: [ { name: 'itemA', value: 55 } ],
            center: ['50%', '60%'],
            axisLabel: {
              formatter: '{value}%',
              style: {
                fill: '#fff'
              }
            },
            axisTick: {
              style: {
                stroke: '#fff'
              }
            },
            animationCurve: 'easeInOutBack'
          }
        ]
      }
    }
  },
}
</script>

<style scoped lang="scss">
.item-con{
  padding: 3% 5%;
  .rate-num{
    position: absolute;
    top: 15%;
    text-align: center;
    width: 100%;
    font-weight: bold;
    font-size: 1.6rem;
    span{
      font-size: 2.5rem;
      color: deepskyblue;
      margin-right: 1%;
    }
  }
}
</style>