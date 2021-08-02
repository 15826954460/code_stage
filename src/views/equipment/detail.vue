<template>
  <div class="device-detail">
    <div class="back-page">
      <div class=""> <a-icon type="left" class="left-icon" @click="$router.back(-1)"/>设备详情</div>
    </div>
    <div class="container">
     <div class="clearfix">
       <div class="name fl"><img src="../../assets/image/devices/name.png" alt="设备名称"><b>{{ detail.deviceName }}</b></div>
       <div class="fun-box fr">
         <a-button type="primary" class="btn" @click="toExport">导出历史数据</a-button>
         <a-button type="primary" class="btn" @click="changeName">修改名称</a-button>
         <a-button type="primary" class="btn" @click="showDeleteConfirm">删除</a-button>
       </div>
     </div>
      <div class="device-info">
        <div class="device-top clearfix">
          <h4 class="title fl">设备信息</h4>
        </div>
        <div class="info">
          <div class="info-item">分组：{{ detail.gatewayName }}</div>
          <div class="info-item" v-if="detail.status = 1">状态：在线</div>
          <div class="info-item" v-else-if ="detail.status = 2">状态：离线</div>
          <div class="info-item">类型：{{ detail.modelName }}</div>
          <div class="info-item">MAC：{{ detail.deviceMac }}</div>
<!--          <div class="info-item">电量：57%</div>-->
          <div class="info-item">数据更新时间：{{ detail.dataUpdateTime }}</div>
          <div class="info-item">地址：{{ detail.address }}</div>
          <div class="info-item">关联建筑：{{ detail.buildingName }}</div>
        </div>
      </div>
      <div class="device-info device-data">
        <div class="device-top clearfix">
          <h4 class="title fl ">设备读数</h4>
          <div class="fr part-top-r">
<!--            <a-range-picker show-time
                            :default-value="[moment(getCurrentData(), dateFormat), moment(getCurrentData(), dateFormat)]"
                            :format="dateFormat" />-->
            <a-date-picker
                :default-value="moment(getCurrentData(), dateFormat)"
                :format="dateFormat"
                @change="onChangeTime"/>
            <span class="link-btn" @click="toHistory">数据列表<a-icon type="right" /></span>

          </div>
        </div>
        <ul class="data-num">
          <li>
            <p><img src="../../assets/image/devices/temp.svg" alt="">温度</p>
            <b>{{ v1 || 0 }}</b>
          </li>
          <li>
            <p><img src="../../assets/image/devices/hum.svg" alt="">湿度</p>
            <b>{{ v2 || 0}}</b>
          </li>
          <li>
            <p><img src="../../assets/image/devices/pre1.svg" alt="">气压</p>
            <b>{{ v3 || 0 }}</b>
          </li>
          <li>
            <p><img src="../../assets/image/devices/battery.svg" alt="">电池电压</p>
            <b>{{ v4 || 0 }}</b>
          </li>
        </ul>
      </div>
    </div>

    <a-modal
        class="change-name-pop"
        title="名称"
        v-model="visible"
        ok-text="保存"
        @ok="handleOk"
    >
      <input type="text" value="detail.deviceName " v-model="getNewName" placeholder="请输入团队名称">
    </a-modal>
  </div>
</template>

<script>
import api from "@/axios/api";
import moment from 'moment';
export default {
  name: "detail",
  data() {
    return {
       dateFormat: 'YYYY-MM-DD',
      // monthFormat: 'YYYY/MM',
      // dateFormatList: ['DD/MM/YYYY', 'DD/MM/YY'],
      visible: false,
      confirmLoading: false,
      detail:[],
      v1:'',
      v2:'',
      v3:'',
      v4:'',
      getNewName:'',
    };
  },
  created() {
    this.getEquipmentList();
  },
  methods: {
    //获取设备列表
    async getEquipmentList(force = true) {
      if (!force) { return;}
      this.loading = true;
      const { code, data, count } = await api.equipment.getEquipmentList({
        params: {
          extData:2,
          id:this.$route.query.id,
          deviceName:this.getNewName,
        }
      });
      if (code === 200) {
        this.detail = data;
        this.v1 =  data.deviceData.v1;
        this.v2 =  data.deviceData.v2;
        this.v3 =  data.deviceData.v3;
        this.v4 =  data.deviceData.v4;
        this.deviceName = data.deviceName
      }
      this.loading = false;
    },

    moment,
    //获取当前时间
    getCurrentData() {
      return new Date().toLocaleDateString();
    },

    //修改当前设备名称
    changeName() {
      let _this = this;
      _this.visible = true;
      _this.getNewName = this.deviceName
    },
    handleOk(e) {
      let _this = this;
      _this.visible = false;
      _this.getEquipmentList(this.getNewName);
    },


    //删除设备
    showDeleteConfirm(e) {
      let _this = this;
      let id = _this.$route.query.id;
      console.log(id,333);
      this.$confirm({
        title: '确定要删除当前设备吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          api.equipment.delEquipment(id).then(data => {
            if (data.code == 200) {
              _this.$router.push({path:'/equipmentList'})
            } else {
              _this.$message.error(data.msg);
            }
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },

    //选择日期
    onChangeTime(date, dateString) {
      console.log(date, dateString);
    },

    toExport(){
      this.$router.push({path:'/export',query:{}});
    },

    toHistory(id){
      this.$router.push({path:'/history',query:{id:this.$route.query.id}});
    },

  },
}
</script>
<style lang='scss' scoped>
.device-detail {
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
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
  .container{
    padding:0 15px;
    .name{
      height: 66px;
      line-height: 66px;
      img{
        vertical-align: middle;
      }
      b{
        display: inline-block;
        font-size: 24px;
        margin: 15px;
        vertical-align: middle;
        line-height: 0;
      }
    }
    .device-info{
      font-size: 15px;
      .device-top{
        padding: 3px 15px;
        background-color: rgba(24, 144, 255, 0.8);
        border-radius: 5px;
        color: #fff;
        line-height: 32px;
        .title{
          font-size: 16px;
          color: #fff;
          margin: 0;
        }
      }
      .info{
        padding: 10px 0 15px 46px;
        .info-item{
          padding: 6px 0;
          color: #333;
        }
      }
    }
    .device-data{
      background-color: rgba(24, 144, 255, 0.08);
      border-radius: 5px;
      .part-top-r{
        .link-btn{
          margin-left: 25px;
          cursor: pointer;
        }
      }
      .data-num{
        display: flex;
        padding: 8% 0;
        li{
          flex: 1;
          text-align: center;
          img{
            margin-right: 5px;
            vertical-align: bottom;
          }
          b{
            margin: 0;
            font-size: 30px;
            font-weight: 500;
            line-height: 23px;
            padding-top: 15px;
            color: #000;
          }
        }
      }
    }
    .fun-box{
      padding-top: 16px;
      text-align: right;
      .btn{
        margin-right: 15px;
      }
    }
  }
}
.change-name-pop{
  ::v-deep .ant-modal-header,::v-deep  .ant-modal-footer{
    border: none;
  }
  input{
    width: 100%;
    background:none;
    outline:none;
    border:0px;
    border-bottom: 2px solid #dcdcdc;
    border-bottom-left-radius: 1px;
    border-bottom-right-radius: 1px;
    box-sizing: border-box;
    padding: 5px 0;
    &:focus{
      border-bottom: 2px solid #1890ff;
      border-bottom-left-radius: 1px;
      border-bottom-right-radius: 1px;
    }
  }
}
</style>

