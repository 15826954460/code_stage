<template>
  <div class="approved-date">
<!--    <div class="back-page">
      <div class=""> <a-icon type="left" class="left-icon" @click="$router.back(-1)"/>校准日期</div>
    </div>-->
    <div class="tab">
      <div class="item" v-for="(item,index) in tabArr" :key="index" :class="curTab == index ? 'active' : '' " @click='tab(index)'>{{item}}</div>
    </div>

    <div class="content">
      <a-table
          :columns="columns"
          :data-source="data"
          :pagination="false"
          :loading="loading"
          bordered
          size="small"
          rowKey="id">
        <template  slot="operation" slot-scope="text,record">
          <a-button type="primary" size="small" @click.stop="showApprovedDatePop(record.id)">修改校准日期</a-button>
        </template >
        <template slot="checkExpiredTime" slot-scope="text">
          <span v-if="Math.floor(((new Date(text).getTime()) - (new Date().getTime()))/ 1000 / 60 / 60 / 24) <= 30" style="color: red">{{text}}</span>
          <span  v-else>{{text}}</span>
        </template>
      </a-table>
    </div>

    <div v-show="total > 0" class="__pagination-wrap">
      <Paginagion
          :total="total"
          @pageSizeChange="pageSizeChange"
          @pageNumChange="pageNumChange"
      />
    </div>
    <!--修改校准日期弹窗-->
    <a-modal
        v-model="approvedDateShow"
        title="修改校准日期"
        :ok-button-props="{ props: { disabled: false } }"
        @ok="changeDateOk"
    >
      <a-date-picker style="width: 100%" @change="onChangeDate"></a-date-picker>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import api from "@/axios/api";
import Paginagion from "@/components/common/Pagination.vue";

const columns = [
  {
    title: '设备id',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '设备名称',
    dataIndex: 'deviceName',
    key: 'deviceName',
    scopedSlots: { customRender: 'deviceName' },
  },
  {
    title: '校准截止日期',
    dataIndex: 'checkExpiredTime',
    key: 'checkExpiredTime',
    scopedSlots: { customRender: 'checkExpiredTime' },
  },

  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  name: 'approved-date-page',

  data() {
    //this.cacheData = data.map(item => ({ ...item }));
    return {
      tabArr:['全部','即将到期'],
      curTab: 0,  //默认选中第一个
      data:[],
      columns,
      total: 0,
      startPage: 1,
      pageSize: 10,
      approvedDateShow:false,
    };
  },
  components: {Paginagion},
  created() {
    this.getEquipmentList();
  },

  // watch: {
  //   curTab:function (index){
  //     if (index == 0){
  //       this.newData = this.data
  //     }else {
  //       this.newData = this.filterTime()
  //     }
  //   }
  // },

  methods: {
    moment,
    tab(index) {
      this.curTab= index;
    },

    showApprovedDatePop(id){
      this.approvedDateShow = true;
      this.deviceId = id;
    },


      //获取日期
    onChangeDate(date, dateString) {
      const currentDate = dateString;
      const d = new Date(currentDate);
      const year = d.getFullYear()+1;
      const month = d.getMonth()+1;
      const day = d.getDate();
      const lastDate = year+"-"+month+"-"+day;

      if (dateString && dateString != "") {
        this.start_time = moment(dateString).format('x') / 1000;
        this.end_time = moment(lastDate).format('x') / 1000;
      }
      console.log(this.start_time,this.end_time,'1');

      //指定时间小于当前时间30天
      // const EndTime = new Date(lastDate);
      // // 当前系统时间
      // const NowTime = new Date();
      // const t = EndTime.getTime() - NowTime.getTime();
      // const dd = Math.floor(t / 1000 / 60 / 60 / 24);
      // const h = Math.floor(t / 1000 / 60 / 60 % 24);
      // const m = Math.floor(t / 1000 / 60 % 60);
      // const s = Math.floor(t / 1000 % 60);
      // const timeDifference = dd + " 天" + h + " 时" + m + " 分" + s + " 秒";
      // console.log(timeDifference);
    },

    //获取设备列表
    async getEquipmentList(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        extData:1,
        page: this.startPage,
        pageSize: this.pageSize,
      }
      const { code, data, count } = await api.equipment.getEquipmentList({params})
      if (code === 200) {
        this.data = data;
        this.total = count;
      }
      this.loading = false;
    },

    //编辑设备--修改校准日期
    async changeDateOk() {
      this.loading = true;
      let params = {
        id:this.deviceId,
        checkStartTime:this.start_time,
        checkExpiredTime:this.end_time,
      }
      this.approvedDateShow = false;
      const res = await api.equipment.updateEquipment({params});
      if (res) {
        this.getEquipmentList();
      }
      this.loading = false;
    },

    //分页
    pageSizeChange({ pageSize, pageNum }) {
      this.pageSize = pageSize;
      this.startPage = pageNum;
      this.getEquipmentList();
    },

    pageNumChange({ pageSize, pageNum }) {
      this.startPage = pageNum;
      this.pageSize = pageSize;
      this.getEquipmentList();
    },
  }
}
</script>

<style lang='scss' scoped>
.approved-date{
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
  .tab{
    width: 100%;
    border-bottom: 3px solid #f2f2f2;
    padding: 15px 0;
    .item{
      display: inline-block;
      width: 160px;
      text-align: center;
      padding: 15px 0;
      font-weight: bold;
      cursor: pointer;
      border: 2px solid #1890ff;
      &:first-child{
        border-radius: 5px 0 0 5px;
      }
      &:last-child{
        border-radius: 0 5px 5px 0;
      }
      &.active{
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;
      }
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
