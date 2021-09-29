<template>
  <dv-border-box-12  class="item-con" >
    <div class="title">设备故障率</div>
    <dv-water-level-pond :config="config" style="width:50%;height:200px;margin: 0 auto;" />
    <div class="rate-num"> <span>1</span>%</div>
  </dv-border-box-12>
</template>

<script>
export default {
  name: "failureRate",
  data() {
    return {
      config:{
        data: [1, 1],
        shape: 'roundRect'
      }
    }
  },
}
</script>

<style scoped lang="scss">
.item-con{
  text-align: center;
  .title{
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    margin-top: 3%;
    margin-bottom: 20%;
  }
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