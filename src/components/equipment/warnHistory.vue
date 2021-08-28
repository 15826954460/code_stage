<template>
  <div class="warnning-container">
    <div class="search-box">
      <a-select  placeholder="事件类型" style="width: 150px" @change="onTypeChange">
        <a-select-option v-for="item in eventType" :key="item.id" :value="item.id">{{item.rname}}</a-select-option>
      </a-select>

      <a-range-picker @change="onChange">
        <a-icon slot="suffixIcon" type="calendar" />
      </a-range-picker>

      <a-input-search placeholder="请输入设备编码查询" style="width: 200px" enter-button  @search="onSearch"/>
    </div>
    <div class="content">
      <a-table  :columns="columns"
                :dataSource="tableData"
                :pagination="false"
                :customRow="rowClick"
                :rowKey="(record,index)=>{return index}" >
      </a-table>
      <Paginagion :total="total" @pageSizeChange="pageSizeChange" @pageNumChange="pageNumChange" class="paginagion"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from "@/axios/api";
import Paginagion from "@/components/common/Pagination.vue";

const columns = [
  /*{
    title: "设备名称",
    dataIndex: "",
  },*/
  {
    title: "设备编码",
    dataIndex: "dmac",
  },
  {
    title: "分组",
    dataIndex: "groupName",
  },
  {
    title: "警报类型",
    dataIndex: "rname",
    // scopedSlots: { customRender: 'rname' },
    // customRender:(rname,row,index)=> {
    //   return  rname.slice(5,-1)
    // }
  },
  {
    title: "警报內容",
    dataIndex: "msg",
  },
  {
    title: "警报时间",
    dataIndex: "wtime",
    scopedSlots: { customRender: 'wtime' },
    customRender:(wtime,row,index)=> {
      return moment.unix(wtime).format('YYYY-MM-DD HH:mm:ss')
    }
  },
];

export default {
  name: 'warnninf-page',

  data() {
    return {
      columns,
      tableData:[],
      keyWord:'',
      eventType:[],
      total: 0,
      startPage: 1,
      pageSize: 10,
    }
  },

  components: {Paginagion},

  created() {
    this.getWarnHistory()
    this.getEventTypeList()
  },

  mounted() {},

  methods: {
    //获取设备类型
    async getEventTypeList(force = true) {
      if (!force) { return;}
      this.loading = true;
      const { code ,data} = await api.system.getEventTypeList();
      if (code === 200) {
        this.eventType = data;
      }
      this.loading = false;
    },

    //获取实时警告数据
    async getWarnHistory(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        page: this.startPage,
        pageSize: this.pageSize,
      }
      if(this.rid){
        params.rid = this.rid
      }
      if(this.keyWord){
        params.deviceMac = this.keyWord
      }
      if (this.start_time && this.start_time != "" && this.end_time && this.end_time != "") {
        params.startTime= this.start_time;
        params.endTime= this.end_time;
      }
      const { code, data , count} = await api.warn.getWarnHistory({params});
      if (code === 200) {
        this.tableData = data;
        this.total = count;
      }
      this.loading = false;
    },


    //搜索
    onSearch(value) {
      this.keyWord = value;
      this.getWarnHistory()
    },

    //选择事件类型
    onTypeChange(value) {
      //console.log("rid=" + value );
      this.rid = value;
      this.getWarnHistory()
    },

    //日期选择
    onChange(date, dateString) {
      //console.log(date, dateString);
      if (dateString && dateString != "") {
        this.start_time = dateString[0];
        this.end_time = dateString[1];
      }
      this.getWarnHistory()
      // this.params = {
      //   startTime: this.start_time,
      //   endTime: this.end_time,
      // };
     // console.log(this.start_time,this.end_time,222222);
    },

    //点击跳转至设备详情
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            //console.log(record, index, 2222);
            this.$router.push({path:'/equipmentDetail',query:{id:record.did}});
          },
        }
      };
    },

    //分页
    pageSizeChange({ pageSize, pageNum }) {
      this.pageSize = pageSize;
      this.startPage = pageNum;
      this.getWarnHistory();
    },

    pageNumChange({ pageSize, pageNum }) {
      this.startPage = pageNum;
      this.pageSize = pageSize;
      this.getWarnHistory();
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
  .paginagion{
    text-align: right;
    margin-top: 4%;
  }
}
</style>
