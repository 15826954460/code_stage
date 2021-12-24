<template>
  <div class="setting-page">
      <a-table
          class="table"
          :row-selection="rowSelection"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          :loading="loading"
          bordered
          size="small"
          rowKey="id">
        <template  slot="operation" slot-scope="text,record">
          <a-button type="primary" size="small" @click.stop="showSetConfirm(record.id)" class="btn">设置</a-button>
          <a-button type="primary" size="small" @click.stop="showApprovedDatePop(record.id)" class="btn">修改校准日期</a-button>
        </template >
        <template slot="checkExpiredTime" slot-scope="text">
          <div v-if="Math.floor(((new Date(text).getTime()) - (new Date().getTime()))/ 1000 / 60 / 60 / 24) <= 30" >{{text}}
            <span class="red-hint"><a-icon type="exclamation-circle" theme="filled" />该设备校准日期将过期,请及时修改</span>
          </div>
          <div  v-else>{{text || '--' }}</div>
        </template>
      </a-table>

    <div class="fun-box">
      <div class="btn-box">
        <a-button type="primary" class="check-all-btn"   @click="showSetConfirm">设置</a-button>
      </div>

      <Paginagion v-show="total > 0" :total="total" @pageSizeChange="pageSizeChange" @pageNumChange="pageNumChange"/>
    </div>

    <!--设置弹窗-->
    <Set :visible="setModel" @cancel="hideSetModel()"></Set>

    <!--修改校准日期弹窗-->
    <a-modal v-model="approvedDateShow" title="修改校准日期" :ok-button-props="{ props: { disabled: false } }" @ok="changeDateOk">
      <a-date-picker
          style="width: 100%"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          @change="onChangeDate"/>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import api from "@/axios/api";
import Paginagion from "@/components/common/Pagination.vue";
import Set from "@/components/equipment/setting.vue";


const columns = [
  {
    title: 'ID',
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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
export default {
  name: 'approved-date-page',

  data() {
    //this.cacheData = data.map(item => ({ ...item }));
    return {
      tableData:[],
      columns,
      total: 0,
      startPage: 1,
      pageSize: 10,
      rowSelection,
      setModel:false,  //显示设置弹窗
      approvedDateShow:false,
    };
  },
  components: {Paginagion,Set},
  created() {
    this.getEquipmentList();
  },
  methods: {

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
        this.tableData = data;
        this.total = count;
      }
      this.loading = false;
    },

    setting(id){
      console.log(id);
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
    //显示设置弹窗
    showSetConfirm(){
      this.setModel = true;
    },

    //隐藏设置弹窗
    hideSetModel() {
      this.setModel = false;
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
        this.start_time = moment(dateString).format('X');
        this.end_time = moment(lastDate).format('X');
      }
      console.log(dateString);
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
      const res = await api.equipment.updateEquipment(params);
      if (res) {
        this.getEquipmentList();
      }
      this.loading = false;
    },

  }
}
</script>

<style lang='scss' scoped>
.setting-page{
  padding: 20px 20px 20px 0;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  .table{
    flex: 1;
  }
  .btn{
    margin-left: 20px;
  }
  .fun-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px 0;
    .check-all-btn{
      margin-right:15px;
    }
  }
}
</style>
