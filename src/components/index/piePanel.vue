<template>
 <div class="">
   <div class="chart-box chart-l">
     <div class="chart-top">
       <h4 class="name fl">{{areaYear}}年用户地区分布</h4>
       <a-range-picker
           @panelChange="handleAreaPanelChange"
           @openChange="handleAreaOpenChange"
           :value="areaCurrentYear"
           :mode="['year', 'year']"
           :placeholder="['起始年', '结束年']"
           format="YYYY"
       />
     </div>
     <div class="chart">
       <pieGraph :id="'areaGraph'" :seriesData="areaSeriesData" style="height:300px;"></pieGraph>
     </div>
   </div>

   <div class="chart-box chart-l">
     <div class="chart-top">
       <h4 class="name fl">{{industryYear}}年用户行业分布</h4>
       <a-range-picker
           @panelChange="handleIndustryPanelChange"
           @openChange="handleIndustryOpenChange"
           :value="industryCurrentYear"
           :mode="['year', 'year']"
           :placeholder="['起始年', '结束年']"
           format="YYYY"
       />
     </div>
<!--     -->
     <div class="chart">
       <pieGraph :id="'industryGraph'" :seriesData="industrySeriesData" style="height:300px;"></pieGraph>
     </div>
   </div>
 </div>
</template>

<script>
import api from "@/axios/api";
import pieGraph from '@/components/echarts/pieGraph'
import { AREA_OBJ_DATA, INDUSTRY_OBJ } from "@/constant";
import codeMessage from "@/constant/code-message";
import dayjs from "dayjs";
import { mapActions, mapState, createNamespacedHelpers } from "vuex";

export default {
  name: "areaPane",
  data() {
    return {
      areaYear:'',
      industryYear:'',
      areaCurrentYear: [],
      areaDatePickerIsopen: false,
      areaParams: {
        type: 1,
        startTime: +new Date(),
        endTime: +new Date(),
      },
      areaSeriesData: [],
      industryDatePickerIsopen: false,
      industryCurrentYear: [],
      industryParams: {
        type: 2,
        startTime: +new Date(),
        endTime: +new Date(),
      },
      industrySeriesData: [],
    };
  },
  components: {pieGraph},
  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),
  },
  watch: {
    isLogined(nv, ov) {
      console.log('isLogined')

      if (nv) {
        console.log('login')
        this.initPieData(1);
        this.initPieData(2);
      }
    }
  },
  mounted() {
    if (!this.isLogined) {
      return;
    }
    this.initPieData(1);
    this.initPieData(2);
  },
  methods: {
    async initPieData(type) {
      const params = type === 1 ? this.areaParams : this.industryParams;
      const { code, data, msg } = await api.common.userDataStatistics(params);
      if (params.startTime > params.endTime) {
        this.$message.error("时间选择不合法,请重新选择");
        return;
      }
      if (code === 200) {
        // 按区域分布
        if (type === 1) {
          let __year = "";
          if (!this.areaCurrentYear.length) {
            __year = new Date().getFullYear();
          } else if (this.areaCurrentYear.length === 1) {
            __year = this.areaCurrentYear[0];
          } else {
            if (this.areaCurrentYear[0] === this.areaCurrentYear[1]) {
              __year = this.areaCurrentYear[0];
            } else {
              __year = `${this.areaCurrentYear[0]}~${this.areaCurrentYear[1]}`;
            }
          }
          this.areaYear = __year;

          let jsonArray = [];
          let __series = [];
          let __labels = [];
          data &&
          data.length &&
          data.forEach((item) => {
             __series.push(item.count);
             AREA_OBJ_DATA[Number(item.type)] && __labels.push(AREA_OBJ_DATA[Number(item.type)].label);
          });
          for(let i in __series){
            let json = {};
            for(let j in __labels){
              if( i==j ){
                json.value = __series[i];
                json.name = __labels[j];
                jsonArray.push(json);
              }
            }
          }
          this.areaSeriesData = jsonArray;
        }

        // 按行业分布
        if (type === 2) {
          let __year = "";
          if (!this.industryCurrentYear.length) {
            __year = new Date().getFullYear();
          } else if (this.industryCurrentYear.length === 1) {
            __year = this.industryCurrentYear[0];
          } else {
            if (this.industryCurrentYear[0] === this.industryCurrentYear[1]) {
              __year = this.industryCurrentYear[0];
            } else {
              __year = `${this.industryCurrentYear[0]}~${this.industryCurrentYear[1]}`;
            }
          }
          this.industryYear = __year;

          let jsonArray = [];
          let __series = [];
          let __labels = [];
          data && data.length && data.forEach((item) => {
            __series.push(item.count);
            INDUSTRY_OBJ[Number(item.type)] &&
            __labels.push(INDUSTRY_OBJ[Number(item.type)]);
          });
          for(let i in __series){
            let json = {};
            for(let j in __labels){
              if( i==j ){
                json.value = __series[i];
                json.name = __labels[j];
                jsonArray.push(json);
              }
            }
          }
          this.industrySeriesData = jsonArray;
        }
      } else {
        this.$message.error(
            (codeMessage[code] && codeMessage[code].msg) || msg,
            5
        );
      }
    },
    handleAreaPanelChange(value, mode) {
      this.areaCurrentYear = [
        dayjs(value[0]._d).format("YYYY"),
        dayjs(value[1]._d).format("YYYY"),
      ];
    },

    handleAreaOpenChange(status) {
      if (
          !status &&
          this.areaCurrentYear.length > 1 &&
          (this.areaCurrentYear[0] !==
              new Date(this.areaParams.startTime).getFullYear() ||
              this.areaCurrentYear[1] !==
              new Date(this.areaParams.endTime).getFullYear())
      ) {
        this.areaParams = {
          ...this.areaParams,
          startTime: +new Date(this.areaCurrentYear[0] + ""),
          endTime: +new Date(this.areaCurrentYear[1] + ""),
        };
        this.initPieData(1);
      }
    },

    handleIndustryPanelChange(value) {
      this.industryCurrentYear = [
        dayjs(value[0]._d).format("YYYY"),
        dayjs(value[1]._d).format("YYYY"),
      ];
    },

    handleIndustryOpenChange(status) {
      if (
          !status &&
          this.industryCurrentYear.length > 1 &&
          (this.industryCurrentYear[0] !==
              new Date(this.industryParams.startTime).getFullYear() ||
              this.industryCurrentYear[1] !==
              new Date(this.industryParams.endTime).getFullYear())
      ) {
        this.industryParams = {
          ...this.industryParams,
          startTime: +new Date(this.industryCurrentYear[0] + ""),
          endTime: +new Date(this.industryCurrentYear[1] + ""),
        };
        this.initPieData(2);
      }
    },

  },
}
</script>

<style scoped lang="scss">
.chart-box{
  flex: 1;
  max-width: 49.5%;
  margin-bottom: 15px;
  background-color: rgba(242, 242, 242,0.4);
  border-radius: 5px;
  padding: 15px;
  .chart-top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .name{
      line-height: 32px;
      font-size: 16px;
    }
  }
}
.chart-l{
  margin-right: 15px;
}
</style>