<template>
  <dv-border-box-8 :reverse="true" class="user-profile">
    <h3>设备分布</h3>
    <dv-conical-column-chart :config="config" style="width:100%;height:100%;" />
  </dv-border-box-8>
</template>

<script>
import moment from "moment";

export default {
  name: "perfectnessRate",
  data() {
    return {
      config: {
        data: [
          {
            name: "北京",
            value: 6
          },
          {
            name: "上海",
            value: 8
          },
          {
            name: "广州",
            value: 2
          },
          {
            name: "深圳",
            value: 5
          },
          {
            name: "湖北",
            value: 3
          },
        ],
        center: ['50%', '15%'],
      }
    }
  },
}
</script>

<style scoped lang="scss">
.user-profile{
  height: 360px;
  color: #fff;
  padding: 5%;
  h3{
    color: #fff;
    font-size: 1rem;
  }
}
</style>