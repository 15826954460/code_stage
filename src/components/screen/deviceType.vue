<template>
  <div class="user-profile">
    <h3>产品型号</h3>
    <dv-capsule-chart  :config="config" style="width:100%;height:100%;" />
  </div>
</template>

<script>
import api from "@/axios/api";

export default {
  name: "perfectnessRate",
  radius: '40%',
  activeRadius: '45%',
  data() {
    return {
      config: {
        data: [],
        center: ['50%', '15%'],
        colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
        unit: '单位',
        showValue: true
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
        type:2,
      }
      const { code ,data} = await api.screen.getScreenStatistic({params});
      if (code === 200) {
        this.config = {
          ...this.config,
          data: [
            {
              name: "温湿度气压计Lora",
              value: data[0]
            },
            {
              name: "TH6100温度计",
              value: data[1]
            },
            {
              name: "门磁AN-305A",
              value: data[2]
            },
            {
              name: "无线烟感AN-102B",
              value: data[3]
            },
            {
              name: "无线温湿度AN-310",
              value: data[4]
            },
            {
              name: "无线水浸AN-217",
              value: data[5]
            },
            {
              name: "燃气报警器AN-217",
              value: data[6]
            },
            {
              name: "无线GPS定位器AN-122",
              value: data[7]
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