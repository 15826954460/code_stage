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
        header: ['ID', '警报内容', '警报时间'],
        data:[],
        rowNum: 8,
        align: ['left'],
        carousel: 'page',
        headerBGC:'',
        oddRowBGC:'',
        evenRowBGC:'',
        columnWidth: [58]
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getWarnList();
    });
  },
  methods: {
    //获取实时警告数据
    async getWarnList(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {limit:10,}
      const { code, data , count} = await api.screen.getScreenWarn({params});
      if (code === 200) {
        const arr = [];
        for (let i of data){
          arr.push({
            id: i.id,
            msg: i.msg,
            wtime: moment.unix(i.wtime).format('YYYY-MM-DD HH:mm:ss'),
          })
        }
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