<template>
  <dv-border-box-8  class="item-con">
    <h3>设备警报</h3>
    <dv-scroll-board :config="config" style="width:100%;height:90%" />
  </dv-border-box-8>
</template>

<script>
import api from "@/axios/api";
import moment from "moment";
export default {
  name: "warinList",
  data() {
    return {
      config:{
        header: ['设备编码', '警报内容', '警报时间'],
        // data:[
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        //   ['582D344C08E7', '高湿度','2021-09-28 22:36:00'],
        // ],
        data:[],
        rowNum: 8,
        align: ['left'],
        carousel: 'page',
        headerBGC:'',
        oddRowBGC:'',
        evenRowBGC:'',
      }
    }
  },
  // created() {
  //   this.getWarnRealTime()
  // },
  created() {
    this.$nextTick(() => {
      this.getWarnRealTime();
    });
  },
  methods: {
    //获取实时警告数据
    async getWarnRealTime(force = true) {
      if (!force) { return;}
      this.loading = true;
      const { code, data , count} = await api.warn.getWarnRealTime();
      if (code === 200) {
        //this.config.data = data
        // this.config = { ...this.config }
        // console.log(this.config.data);
        //
        const arr = [];
        for (let i of data){
          arr.push({
            dmac: i.dmac,
            msg: i.msg,
            wtime: moment.unix(i.wtime).format('YYYY-MM-DD HH:mm:ss'),
          })
        }
        //console.log('loop', arr)
        this.config.data = arr;
        this.config = { ...this.config }
      }
      this.loading = false;
    },
  }
}
</script>

<style scoped lang="scss">
.item-con{
  padding: 3%;
  h3{
    color: #fff;
    font-size: 1rem;
  }
}
</style>