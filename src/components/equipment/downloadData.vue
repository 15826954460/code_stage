<template>
  <!-- 导出历史数据-->
  <a-modal
      :visible="visible"
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('ok') }"
      title="导出历史数据"
      :maskClosable="false"
  >
    <a-range-picker @change="onChangeTime">
      <a-icon slot="suffixIcon" type="calendar" />
    </a-range-picker>

    <template slot="footer">
      <a-button  type="primary" :loading="loading" @click="exportOk">确定</a-button>
    </template>

  </a-modal>

</template>

<script>
import api from "@/axios/api";
import moment from "moment";

export default {
  name: "addGroup",
  props: ['visible','deviceId'],

  data() {
    return {
      loading: false,
    };
  },
  created() {

  },
  watch:{
    getNewData:function (){
      return this.deviceId
    }
  },
  methods: {
    onChangeTime(date, dateString) {
      console.log(date, dateString);
      if (dateString && dateString != "") {
        this.start_time = moment(dateString[0]).format('x') / 1000;
        this.end_time = moment(dateString[1]).format('x') / 1000;//零点时间
      }
      console.log(this.start_time,this.end_time,222222);
      console.log('dateString1',this.end_time);
      console.log('dateString2',this.end_time);
    },

    async exportOk() {
      this.loading = true
      let params = {
        deviceIds:this.deviceId,
        startTime:this.start_time,
        endTime:this.end_time,
      }
      //const { code, data, count } = await api.export.getExportData(this.deviceId,this.start_time,this.end_time);
      const { code, data, count } = await api.export.getExportData({params,responseType: 'blob'});
      if (code === 200) {
        console.log('接口调用成功11');
        this.$emit('cancel')
        const link = document.createElement('a') // 首先创建一个a标签毕竟下载是要通过a标签来下载的。
        let blob = new Blob([data], {type: "application/vnd.ms-excel"}) // 第一个参数是后台返回的文件流变量，第二个参数是要转换的类型，由type的值来决定。
        link.href = URL.createObjectURL(blob) // 用URL.createObjectURL方法来创建一个URL对象并赋值给a标签的heft属性。
        link.download = '表格' // 设置文件名字。
        link.click() // 触发点击事件，开始下载。
      }
      this.loading = false;
    },

  },
};
</script>

<style lang='scss' scoped>
.group-pop{
  .group-list{
    .group-item{
      line-height: 30px;
      cursor: pointer;
      padding: 0 10px;
      border-radius: 3px;
      &:hover{
         background-color: rgba(24, 144, 255, 0.15);
       }
      &.cur-group{
         background-color: rgba(24, 144, 255, 0.25);
         position: relative;
        &:before{
           content: '';
           width: 16px;
           height: 16px;
           background: url("../../assets/image/devices/check.png") no-repeat;
           background-size: contain;
           position: absolute;
           right: 15px;
           top: 6px;
         }
      }
    }
  }
  .add-group{
    width: 100%;
    border: 1px dashed #eee;
    padding: 30px 10px 0;
    text-align: center;
    input{
      border: none;
      height: 30px;
      padding: 0 10px;
      margin-right: 15px;
      border-bottom: 2px solid #1890ff;
    }
    .btn{
      margin-right: 10px;
    }
  }
  .creat-g-btn{
    float: left;
    padding-left: 0;
  }
  .text{
    font-size: 10px;
    color: red;
  }
}
</style>