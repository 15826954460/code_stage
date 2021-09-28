<template>
  <!-- 添加至分组-->
  <a-modal class="set-pop"
           :visible="visible"
           @cancel="() => { $emit('cancel') }"
           @ok="() => { $emit('ok') }"
           title="设置"
           :maskClosable="false"
  >
     <div class="set-con">
       <div class="con-item range-item">
         <h3 class="title">超限上报条件</h3>
         <div class="p15">
           <span class="name">温度</span>
           <a-slider range  :default-value="[20, 50]" :min="-10" :max="50" @change="onChangeTemp"/>
           <div class="p15 range-num">
             <span>-10°C</span>
             <span>50°C</span>
           </div>
         </div>
         <div class="p15">
           <span class="name">湿度</span>
           <a-slider range  :default-value="[20, 50]" :min="0" :max="100" @change="onChangeHum"/>
           <div class="p15 range-num">
             <span>0%</span>
             <span>100%</span>
           </div>
         </div>
         <div class="p15">
           <span class="name">气压</span>
           <a-slider range :default-value="[20, 50]" :min="26" :max="126" @change="onChangePre"/>
           <div class="p15 range-num">
             <span>26kPa</span>
             <span>126kPa</span>
           </div>
         </div>
       </div>

       <div class="con-item">
         <h3 class="title">定时上报间隔</h3>
         <a-select  default-value="1小时" style="width: 300px" @change="handleReportChange" class="p15">
           <a-select-option v-for="item in reportTime" :key="item" :value="item">{{item}}</a-select-option>
         </a-select>
       </div>

       <div class="con-item">
         <h3 class="title">数据采集间隔</h3>
         <a-select  default-value="15分钟"  style="width: 300px" @change="handleCollectChange" class="p15">
           <a-select-option v-for="item in collectInterval" :key="item" :value="item">{{item}}</a-select-option>
         </a-select>
       </div>
     </div>


    <template slot="footer">
      <p class="tip-text">您修改的设置将在下次联网时生效。</p>
      <a-button  type="primary" :loading="loading" >确定</a-button>
    </template>
  </a-modal>

</template>

<script>
import api from "@/axios/api";

export default {
  name: "set",
  props: ['visible','deviceId'],

  data() {
    return {
      loading: false,
      minTemp:'',
      maxTemp:'',
      minHum:'',
      maxHum:'',
      minPre:'',
      maxPre:'',
      reportTime:['10分钟', '20分钟', '30分钟', '1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '7小时', '8小时', '9小时', '10小时'],
      collectInterval:['1分钟', '5分钟', '10分钟', '15分钟', '20分钟', '25分钟', '30分钟', '35分钟', '40分钟', '45分钟', '50分钟', '55分钟', '60分钟'],
    };
  },
  created() {},
  methods: {
    onChangeTemp(value) {
      console.log('change: ', value);
      this.minTemp = value[0];
      this.maxTemp = value[1]
      console.log('温度min: ', this.minTemp +'---' + '温度max:',this.maxTemp );
    },
    onChangeHum(value) {
      this.minHum = value[0];
      this.maxHum = value[1]
    },
    onChangePre(value) {
      this.minPre= value[0];
      this.maxPre= value[1]
    },
    handleReportChange(value) {
      console.log(`selected ${value}`);
    },
    handleCollectChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.set-pop{
  .set-con{
    .con-item{
      margin-bottom: 15px;
      .title{
        font-size: 14px;
        font-weight: bold;
      }
      .p15{
        padding-left: 20px;
      }
      .ant-slider{
        //margin: 8px 6px 10px;
        //padding: 0px;
      }
      .ant-slider-track{
        background-color: #1890ff !important;
      }
      .ant-slider-handle{
        border-color: #1890ff;
      }
    }
    .range-item{
      .p15{
        padding: 0 20px 3px 65px;
        position: relative;
        font-size: 14px;
        .name{
          position: absolute;
          top: -5px;
          left: 20px;
        }
        .range-num{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          padding: 0;
          font-size: 12px;
          color: rgba(0,0,0,.45);
          margin-top: -5px;
        }
        //::v-deep .ant-slider-mark-text{
        //  font-size: 12px;
        //  padding-left: 10px;
        //}
        //::v-deep .ant-slider-with-marks{
        //  margin-bottom: 35px;
        //}
      }
    }
  }
  .tip-text{
    float: left;
    font-size: 12px;
    line-height: 30px
  }
}

</style>