<template>
  <div class="warnning-container">
    <div class="search-box">
      <a-select  placeholder="日志类型" style="width: 150px" @change="onTypeChange">
        <a-select-option
            v-for="item in logType"
            :key="item"
            :value="item">{{item}}
        </a-select-option>
      </a-select>

      <a-range-picker @change="onChange">
        <a-icon slot="suffixIcon" type="calendar" />
      </a-range-picker>

      <a-input-search placeholder="请输入名称查询" style="width: 200px" enter-button  @search="onSearch"/>
    </div>
    <div class="content">
      <a-table
          :columns="columns"
          :data-source="tableData"
          :customRow="rowClick"
          row-key="key"
      />
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
const columns = [
  {
    title: "事件名称",
    dataIndex: "eventName",
  },
  {
    title: "警报类型",
    dataIndex: "eventType",
  },
  {
    title: "警报內容",
    dataIndex: "remark",
  },
  {
    title: "警报时间",
    dataIndex: "",
  },
];

export default {
  name: 'warnninf-page',

  data() {
    return {
      logType:['正常','异常'],
      columns,
      tableData:[],
      keyWord:'',
    }
  },

  components: {},

  created() {
    this.getEventRealTime()
  },

  mounted() {},

  methods: {
    //获取实时警告数据
    async getEventRealTime(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        page: this.startPage,
        pageSize: this.pageSize,
      }
      if(this.eventType){
        params.eventType = this.eventType
      }
      if(this.keyWord){
        params.deviceName = this.keyWord
      }
      if (this.start_time && this.start_time != "" && this.end_time && this.end_time != "") {
        params.startTime= this.start_time;
        params.endTime= this.end_time;
      }
      const { code, data , count} = await api.event.getEventRealTime({params});
      if (code === 200) {
        this.tableData = data;
        this.total = count;
      }
      this.loading = false;
    },

    //搜索
    onSearch(value) {
      this.keyWord = value;
      this.getEventRealTime()
    },

    onTypeChange(value) {
      // console.log(`selected ${value}`);
      // if (value && value !== '') {
      //   this.tableData = this.data.filter(
      //       (p) => p.type.indexOf(value) !== -1
      //   )
      // } else {
      //   this.tableData = this.data
      // }
      this.eventType = value;
      this.getEventRealTime()
    },

    //日期选择
    onChange(date, dateString) {
      console.log(date, dateString);
      if (dateString && dateString != "") {
        this.start_time = dateString[0];
        this.end_time = dateString[1];
      }
      // this.params = {
      //   startTime: this.start_time,
      //   endTime: this.end_time,
      // };
      console.log(this.start_time,this.end_time,222222);
    },

    //点击跳转至设备详情
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index, 2222);
            this.$router.push({path:'/equipmentDetail'});
          },
        }
      };
    },
  }
}
</script>

<style lang='scss' scoped>
.warnning-container{
  .search-box{
    padding: 15px 15px 15px 5px;
    border-bottom: 1px solid #f2f2f2;
    .ant-select,.ant-calendar-picker{
      margin-right: 20px;
    }
  }
  .content{
    padding-right: 10px;
  }
}
</style>
