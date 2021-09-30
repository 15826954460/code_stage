<template>
<div class="history-page">
  <div class="back-page">
    <div class=""> <a-icon type="left" class="left-icon" @click="$router.back(-1)"/>历史数据</div>
  </div>
  <div class="container">
    <div class="name"><img src="../../assets/image/devices/name.png" alt="设备名称"><b>{{ this.$route.query.deviceName }}</b></div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="温度">
        <a-table :columns="columnsTemp" :data-source="tableData"  row-key="key"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="湿度">
        <a-table :columns="columnsHum" :data-source="tableData"  row-key="key"/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="气压">
        <a-table :columns="columnsPre" :data-source="tableData"  row-key="key"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</div>
</template>

<script>
const columnsTemp = [{title: "时间", dataIndex: "time",}, {title: "温度", dataIndex: "temp",}];
const columnsHum = [{ title: "时间", dataIndex: "time", }, {title: "湿度", dataIndex: "hum",}];
const columnsPre = [{title: "时间",dataIndex: "time", }, { title: "气压", dataIndex: "pre", }];
export default {
  name: "history",

  data() {
    return {
      logType:['正常','异常'],
      columnsTemp,
      columnsHum,
      columnsPre,
      tableData:[],
      keyWord:'',
    }
  },

}
</script>

<style lang='scss' scoped>
.history-page{
  .back-page {
    font-size: 20px;
    color: #000;
    padding: 15px 15px 15px 5px;
    border-bottom: 5px solid #f2f2f2;

    .left-icon {
      cursor: pointer;
      padding-right: 8px;
    }
  }
  .name{
    padding: 10px 15px;
    //img{
    //  margin-right: 5px;
    //}
    b{
      display: inline-block;
      font-size: 20px;
      margin: 15px;
      vertical-align: middle;
      line-height: 0;
    }
  }
}
</style>