<template>
  <div class="equipment-wrapper">
    <div class="search-area">
      <div class="search-area-l">
        <a-select placeholder="设备分组" style="width: 150px;margin-right: 15px" @change="groupChange">
          <a-select-option value="all">全部分组</a-select-option>
          <a-select-option value="0">未分组</a-select-option>
          <a-select-opt-group label="自定义分组">
            <a-select-option v-for="item in groupList" :key="item.id" :value="item.id">{{ item.groupName }}</a-select-option>
          </a-select-opt-group>
          <a-select-option value="" ><router-link to="group" class="link-btn" style="display:block;">分组管理</router-link> </a-select-option>
        </a-select>

        <a-select  placeholder="设备类型" style="width: 200px" @change="typeChange">
          <a-select-option v-for="item in deviceType" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
        </a-select>
      </div>
      <div class="search-area-r">
<!--        <router-link class="download-icon" to='/export'><a-icon type="download" /></router-link>-->

        <a-input-search class="search-box"  placeholder="请输入设备名称" style="width: 200px" @search="onSearch" />

        <div class="tab">
          <div class="tab-item" :class="{ 'active': layout == 'card'}" @click="layout = 'card'"><a-icon type="table" /></div>
          <div class="tab-item" :class="{ 'active': layout == 'list'}" @click="layout = 'list'"><a-icon type="unordered-list" /></div>
        </div>
      </div>
    </div>

    <div class="con-area">
      <ol class="status-box clearfix">
        <li class="status-item" v-for="(item,index) in statusArr" :key="index" :class="{'cur-status':curNum==index}" @click="statusTab(index,item.tabIndex)">
          <div class="icon" :style="{background:item.color}"><img :src="require('../../assets/image/devices/'+item.icon)"></div>
          <div class="status-num">
            <span>{{ item.status }}</span>
            <b class="text">{{ item.num }}</b>
          </div>
        </li>
      </ol>

      <div v-if="layout == 'card'" class="card">
        <!-- 卡片模式 -->
        <div class="clearfix"  v-if="tableData && tableData.length > 0">
          <div class="card-item"  v-for="(item,index) in tableData" :key="index" @click.prevent="toDetail(item.id)" :class="selectedIds.indexOf(item.id) != -1  ? 'card-item-b' : ''">
            <a-checkbox  :checked="selectedIds.indexOf(item.id) != -1" class="check-icon"  @click.stop="onChecked($event,item.id)"></a-checkbox>
<!--            <a-tooltip placement="bottom">
              <template slot="title">导出历史数据</template>
              <span class="download-icon" @click.stop="showExportPop($event,item.id)" :class="selectedIds.indexOf(item.id) != -1  ? 'download-icon-b' : ''"><a-icon type="download" /></span>
            </a-tooltip>-->
            <div class="del-icon" :class="selectedIds.indexOf(item.id) != -1  ? 'del-icon-b' : ''"  @click.stop="showDelDeviceConfirm($event,item.id)"></div>
            <div class="item-top name">{{ item.deviceName }}<span class="status-icon" :class="item.status == 1  ? 'online' : 'offline'"></span></div>
            <div class="item-top group">{{item.groupName}}</div>
            <div class="item-top time">{{ item.dataUpdateTime }}</div>
            <div class="data-show">
              <div class="item">
                <div class="temp">温度</div>
                <p>{{ item.deviceData.v1 || 0 }}</p>
              </div>
              <div class="item">
                <div class="hum">湿度</div>
                <p>{{ item.deviceData.v2 || 0 }}</p>
              </div>
              <div class="item">
                <div class="pre">气压</div>
                <p>{{ item.deviceData.v3 || 0 }}</p>
              </div>
            </div>
          </div>

        </div>
        <div class="no-data" v-else>
          <a-empty />
        </div>
      </div>

      <div v-if="layout == 'list'" class="list">
        <!-- 列表模式 -->
        <a-table
            :columns="columns"
            :data-source="tableData"
            :row-selection="rowSelection"
            :customRow="rowClick"
            :pagination="false"
            :loading="loading"
            bordered
            size="small"
            rowKey="id"
        >
          <p slot="action" slot-scope="record">
            <a-button type="danger" size="small" @click.stop="showDelDeviceConfirm($event,record.id)"> 删除</a-button>
            <a-button type="primary" size="small" @click.stop="showExportPop($event,record.id)" style="margin-left: 10px;">导出数据</a-button>
          </p>
        </a-table>
      </div>
    </div>

    <div class="fun-box">
      <div class="btn-box">
        <a-button type="primary" class="check-all-btn" @click="selectAll" v-if="layout == 'card'">全选</a-button>
        <a-button type="primary" class="check-all-btn" v-if="selectedIds.length > 0" @click="showAddGroupModel">添加至分组</a-button>
        <!--<a-button type="primary" class="del-btn" v-if="selectedIds.length > 0" @click="showDelDeviceConfirm()">删除</a-button>-->
        <a-button type="primary" class="check-all-btn" v-if="selectedIds.length > 0" @click="showExportPop">导出历史数据</a-button>
      </div>
      <Paginagion :total="total" @pageSizeChange="pageSizeChange" @pageNumChange="pageNumChange"/>
    </div>

    <!--添加分组-->
    <addGroup :visible="addGroupModel" @cancel="hideAddGroupModel()"  :deviceId='selectedIds'></addGroup>

    <!--导出历史数据选择时间弹窗-->
    <a-modal
        v-model="exportShow"
        title="导出历史数据"
        :ok-button-props="{ props: { disabled: false } }"
        @ok="exportOk"
    >
      <a-range-picker @change="onChangeTime">
        <a-icon slot="suffixIcon" type="calendar" />
      </a-range-picker>
    </a-modal>

  </div>
</template>

<script>
import moment from 'moment';
import api from "@/axios/api";
import addGroup from "@/components/equipment/addGroup.vue";
import Paginagion from "@/components/common/Pagination.vue";

const columns = [
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "分组",
    dataIndex: "groupName",
  },
  {
    title: "温度",
    dataIndex: "deviceData.v1",
  },
  {
    title: "湿度",
    dataIndex: "deviceData.v2",
  },
  {
    title: "气压",
    dataIndex: "deviceData.v3",
  },
  {
    title: "数据最新更新时间",
    dataIndex: "utime",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: 'equipment-page',

  data() {
    return {
      loading: false,
      value: undefined,
      groupList:[],
      deviceType:[], //设备类型
      curNum:0,
      isStatus: '',
      statusArr:[
        {tabIndex:"",status:'全部', icon: 'all.png',color:'#fff'},
        {tabIndex:1,status:'在线', icon: 'online-white.png',color:'#1890ff'},
        {tabIndex:0,status:'离线', icon: 'offline-white.png',color:'#c1bfbf'},
        // {tabIndex:2,icon: 'alarm.png', num:'210',color:'#fff'},
        // {tabIndex:3,icon: 'alarm.png', num:'210',color:'#ffc518'},
        // {tabIndex:4, icon: 'upgrade.png', num:'210',color:'#fff'},
      ],
      keyWord:'',
      layout: 'card', // 列表展示方式 card,list
      tableData:[],  //设备列表
      columns,  //设备表格
      allSelectBtnShow:true,  //是否显示全选按钮
      funBtnShow:false,  //是否显示操作按钮
      addGroupModel:false,  //显示添加分组弹窗
      total: 0,
      startPage: 1,
      pageSize: 10,
      id:'',  //设备id
      groupId:'',
      isSelectAll: false,
      selectedIds:[],
      rowSelection:{
        onChange: (selectedRowKeys, selectedRows) => {
            this.selectedIds = selectedRowKeys
        },
        onSelect: (record, selected, selectedRows) => {
          console.log(record, selected, selectedRows);
        },
       onSelectAll: (selected, selectedRows, changeRows) => {
          console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({//重点部分
          props: {
            defaultChecked: this.selectedIds.indexOf(record.id) > -1 ? true : false,//defaultCheckedId里面是默认选中的id里面是默认选中的id，判断是否含有这些id，有的那就选中，没有的就不选中
            id: record.id + ''//使得id的数据类型为string
          }
        })
      },
      exportShow: false,     // 导出历史数据选择时间弹窗
    }
  },

  components: {addGroup,Paginagion},

  created() {
    this.getEquipmentList();
    this.getGroupList();
    this.getConfig();

  },

  mounted() {},
  watch: {
    value(value) {
      console.log(value);
    },
    rowSelection(newV){
      console.log(newV)
    }
  },
  methods: {
    //列表--多选
    onChecked(e,id) {
      console.log(`checked = ${e.target.checked}`);
      console.log(id)
      this.id = id;
      let index = this.selectedIds.indexOf(id),oldIds = this.selectedIds,newIds = [];
      if(index != -1){
        delete oldIds[index]

      }else if(index == -1 && e.target.checked){
        oldIds.push(id)
      }
      //console.log(oldIds)

      oldIds.forEach((v) => {
        if(v){
          newIds.push(v)
        }
      })
      this.selectedIds = newIds
    },

    //全选
    selectAll(){
      this.isSelectAll = !this.isSelectAll
      if(this.isSelectAll){
        this.selectedIds  = this.tableData.map((v) => {
          //console.log(v)
          return v.id
        })
      }else {
        this.selectedIds = []
      }
    },
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 's111electedRows: ', selectedRows);
    },
    //选择设备分组
    groupChange(value) {
      //console.log("groupId=" + value );
      this.groupId = value;
      this.getEquipmentList()
    },

    //选择设备类型
    typeChange(value) {
      //console.log("modelId=" + value );
      this.modelId = value;
      this.getEquipmentList()
    },

    //选择设备状态
    statusTab(index,tabIndex) {
      this.curNum= index;
      this.isStatus = tabIndex;
      //console.log('isStatus=' + this.isStatus);
      this.getEquipmentList()
    },

    //搜索
    onSearch(value) {
      this.keyWord = value;
      this.getEquipmentList()
    },

    //获取设备列表
    async getEquipmentList(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        extData:2,
        page: this.startPage,
        pageSize: this.pageSize,
      }
      if(this.groupId != 'all' && this.groupId){
        params.groupId = this.groupId
      }
      if(this.modelId){
        params.modelId = this.modelId
      }
      if(this.keyWord){
        params.deviceName = this.keyWord
      }
      if(this.isStatus !== ''){
        params.status = this.isStatus
      }
      const { code, data, count } = await api.equipment.getEquipmentList({params})
      if (code === 200) {
        this.tableData = data;
        this.total = count;
      }
      this.loading = false;
      this.getEquipmentStatus()
    },

    //获取分组列表
    async getGroupList(force = true) {
      if (!force) { return;}
      this.loading = true;
      const { code, data } = await api.group.getGroupList();
      if (code === 200) {
        this.groupList = data;
      }
      this.loading = false;
    },

    //获取设备类型
    async getConfig(force = true) {
      if (!force) { return;}
      this.loading = false;
      const { code ,data} = await api.common.getConfig();
      if (code === 200) {
        this.deviceType = data.models;
      }
      this.loading = false;
    },

    //获取设备状态
    async getEquipmentStatus(force = true) {
      if (!force) { return;}
      this.loading = true;
      const { code ,data} = await api.equipment.getEquipmentStatus();
      if (code === 200) {
        let temp = {
          0:0,
          1:0
        }
        data.forEach((v) => {
          temp[v.status] = v.count
        })
        this.$set(this.statusArr[0], 'num', temp[0] + temp[1])
        this.$set(this.statusArr[1], 'num', temp[1])
        this.$set(this.statusArr[2], 'num', temp[0])
        //console.log(this.statusArr)
      }
      this.loading = false;
    },


    //显示添加至分组弹窗
    showAddGroupModel(){
      this.addGroupModel = true;
    },

    //隐藏添加至分组弹窗
    hideAddGroupModel() {
      this.getEquipmentList()
      this.addGroupModel = false;
      //console.log('add cancel')
    },

    //删除设备
    showDelDeviceConfirm(e,id) {
      let self = this;
      this.$confirm({
        title: '提示',
        content: '确定删除当前设备？',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          api.equipment.delEquipment(id).then(data => {
             if (data.code == 200) {
               self.getEquipmentList();
             } else {
               self.$message.error(data.msg);
             }
           });
        },
        onCancel() {
          //console.log('Cancel');
        },
      });
    },

    showExportPop(e,id){
      this.exportShow = true;
      this.deviceId = id;
      //console.log(this.deviceId,2);
    },

    /*onChangeTime(date, dateString) {
      //console.log(date, dateString);
      if (dateString && dateString != "") {
        this.start_time = dateString[0];
        this.end_time = dateString[1];
        // this.start_time = (new Date(dateString[0])).getTime()/1000;;
        // this.end_time = (new Date(dateString[1])).getTime()/1000;
      }
    },*/
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
      this.loading = true;
      const { code, data, count } = await api.equipment.getEquipmentList({
        params: {
          deviceIds:this.deviceId,
          //deviceIds:this.selectedIds,
          startTime:this.start_time,
          endTime:this.end_time,
        }
      });
      if (code === 200) {
        this.exportShow = false;
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

    //card列表--跳转至详情页
    toDetail(id){
      this.$router.push({path:'/equipmentDetail',query:{id:id}});
    },

    //card列表--跳转至详情页
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            //console.log(record, index);
            this.$router.push({path:'/equipmentDetail',query:{id:record}});
          },
        }
      };
    },

  },
}
</script>

<style lang='scss' scoped>
.ant-empty{
  padding-top: 150px;
}
.equipment-wrapper{
  min-width: 780px;
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  .search-area{
    padding: 15px 15px 15px 5px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .select-box{
      margin-right: 20px;
    }
    .download-icon{
      display: inline-block;
      width: 36px;
      height: 36px;
      text-align: center;
      font-size: 18px;
      line-height: 36px;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 20px;
      &:hover{
        background-color: #1890ff;
        color: #fff;
      }
    }
    .search-box{
      display: inline-block;
    }
    .tab{
      display: inline-block;
      width: 107px;
      height: 36px;
      border: 1px solid #b3b3b3;
      border-radius: 5px;
      vertical-align: top;
      margin-left: 20px;
      .tab-item{
        display: inline-block;
        width: 50%;
        height: 34px;
        line-height: 34px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
      }
      .active{
        background-color: #1890ff;
        color: #fff;
      }
    }
  }
  .con-area{
    flex: 1;
    .status-box{
      padding: 15px 0 0;
      border-bottom: 1px solid #f2f2f2;
      .status-item{
        display: inline-block;
        min-width: 15%;
        border: 1px solid #b3b3b3;
        border-radius: 5px;
        float: left;
        margin-left: 1%;
        margin-bottom: 15px;
        padding: 1% 0 1% 1%  ;
        cursor: pointer;
        .icon{
          display: inline-block;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          vertical-align: middle;
          border: 1px solid #e6e6e6;
          text-align: center;
          font-size: 20px;
          line-height: 36px;
          img{
            width: 45%;
            background-size: cover;
          }
        }
        .status-num{
          display: inline-block;
          vertical-align: middle;
          padding-left: 15px;
          text-align: center;
          .text{
            display: block;
            font-size: 24px;
            font-weight: 500;
            color: #4c4c4c;
            padding-top: 10px;
            line-height: 18px;
          }
        }
      }
      .cur-status{
        border: 1px solid transparent;
        background-color: rgba(24, 144, 255, 0.25);
        position: relative;
        :after{
          position: absolute;
          bottom: -4px;
          left: 5px;
          right: 5px;
          height: 5px;
          content: "";
          -ms-transform: scaleY(.5);
          transform: scaleY(.5);
          background: rgba(24, 144, 255,.2);
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
        }
      }
    }
    .card{
      height: calc(100vh - 360px);
      .card-item{
        width: 240px;
        float: left;
        margin: 0 0 15px 15px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        position: relative;
        cursor: pointer;
        &:hover{
          //background-color: rgb(24,144,255,0.2);
          border: 1px solid #1890ff;
          //box-shadow: 0px 3px 4px -1px #1890ff;
          .data-show{
            border-top: 1px dashed rgb(24,144,255,0.2);
          }
          &.checked{
            background-color: rgb(24,144,255,0.2)
          }
        }
        &.card-item-b{
          border: 1px solid #1890ff;
        }
        .check-icon{
          position: absolute;
          left: 10px;
          top: 12px;
        }
        .download-icon{
          position: absolute;
          right: 10px;
          top: 40px;
          color: rgba(0, 0, 0, 0.4);
          font-size: 16px;
          z-index: 2;
          &:hover{
            color: #1890ff;
          }
          &.download-icon-b{
            color: #1890ff;
          }
        }
        .del-icon{
          width: 16px;
          height: 16px;
          background: url("../../assets/image/devices/del.svg") no-repeat;
          position: absolute;
          right: 10px;
          top: 15px;
          z-index: 2;
        }
        .del-icon:hover,.del-icon-b{
          background: url("../../assets/image/devices/del-blue.svg") no-repeat;
        }
        .item-top{
          height: 24px;
          margin-bottom: 4px;
          line-height: 24px;
          padding-left: 55px;
          position: relative;
          &:before{
            content: '';
            position: absolute;
            left: 28px;
            top: 2px;
          }
          &.name:before{
            width: 20px;
            height: 20px;
            background: url("../../assets/image/devices/name.png") no-repeat;
            background-size: contain;
          }
          &.group:before{
            width: 20px;
            height: 20px;
            background: url("../../assets/image/devices/group.png") no-repeat;
            background-size: contain;

          }
          &.time:before{
            width: 20px;
            height: 20px;
            background: url("../../assets/image/devices/time.png") no-repeat;
            background-size: contain;

          }
          .status-icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            background-size: contain;
            position: absolute;
            right: 25px;
            top: 5px;
            &.online{
              background: url("../../assets/image/devices/online-gray.png") no-repeat;
            }
            &.offline{
              background: url("../../assets/image/devices/offline-gray.png") no-repeat;
            }
          }
        }
        .data-show{
          display: flex;
          -ms-flex-direction: row;
          flex-direction: row;
          -ms-flex-pack: justify;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed #f2f2f2;
          text-align: center;
          position: relative;
          .item{
            div{
              position: relative;
              padding-left: 20px;
              &:before{
                content: '';
                width: 14px;
                height: 14px;
                background: url("../../assets/image/devices/temp.svg") no-repeat;
                background-size: contain;
                position: absolute;
                left: 2px;
                top: 5px;
              }
              &.hum:before{
                background: url("../../assets/image/devices/hum.svg") no-repeat;
                background-size: contain;
              }
              &.pre:before{
                width: 24px;
                height: 24px;
                background: url("../../assets/image/devices/pre.svg") no-repeat;
                background-size: contain;
                top: 3px;
                left: 0;
              }
            }
            p{
              padding-left: 4px;
              margin: 0;
            }
          }
        }
      }
    }
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
.ant-modal-body{
  text-align: center;
}
</style>
