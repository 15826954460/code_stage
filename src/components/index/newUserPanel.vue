<template>
  <div class="">
    <div class="chart-box chart-l">
      <div class="chart-top">
        <h4 class="name fl">新增用户量/月</h4>
        <a-range-picker
            :placeholder="['起始月', '结束月']"
            format="YYYY-MM"
            :value="currentMonth"
            :mode="['month', 'month']"
            @panelChange="handleMonthPanelChange"
            @openChange="handleMounthOpenChange"
        />
      </div>
      <div class="chart">
        <lineGraph :id="'newUserMouth'" :data="optionMouth" style="height:300px;"></lineGraph>
      </div>
    </div>

    <div class="chart-box chart-l">
      <div class="chart-top">
        <h4 class="name fl">新增用户量/年</h4>
        <a-range-picker
            style="margin-right: 10px"
            @panelChange="handleYearPanelChange"
            @openChange="handleYearOpenChange"
            :value="currentYear"
            :mode="['year', 'year']"
            :placeholder="['起始年', '结束年']"
            format="YYYY"
        />
      </div>
      <div class="chart">
        <lineGraph :id="'newUserYear'" :data="optionYear" style="height:300px;"></lineGraph>
      </div>
    </div>
  </div>

</template>

<script>
import api from "@/axios/api";
import dayjs from "dayjs";
import { MOUTH_LIST } from "@/constant";
import { mapActions, mapState, createNamespacedHelpers } from "vuex";
import codeMessage from "@/constant/code-message";
import lineGraph from '@/components/echarts/lineGraph'

export default {
  data() {
    return {
      mounthParams: {
        type: 3,
        startTime: +new Date(`${+new Date().getFullYear()}-01`),
        endTime: +new Date(),
      },
      yearParams: {
        type: 4,
        // startTime: +new Date(`${+new Date().getFullYear() - 5} + ''`),
        // endTime: +new Date(),
        startTime: +new Date(),
        endTime: +new Date(),
      },
      currentYear: [],
      currentMonth: [],
      xDataYear: [],
      yDataYear: [],
      xDataMouth: [],
      yDataMouth: [],
    };
  },
  components: {lineGraph},
  computed: {
    optionMouth() {
      return{
        grid:{
          left:'0%',
          right:'3%',
          bottom:'1%',
          containLabel:true
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['新增用户量'],
          left: 2
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine:{
            show:true,
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#f1f1f1']
            }
          },
          data: this.xDataMouth  // x轴
        },
        yAxis: {
          type: 'value',
          splitLine:{
            show:true,
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#f1f1f1']
            }
          },

        },
        series: [
          {
            name: '新增用户量',
            nameTextStyle: {
              padding: [0, 0, 0, -10]    // 四个数字分别为上右下左与原位置距离
            },
            data: this.yDataMouth,  // y轴
            type: 'line',
            smooth: true, //是否用曲线显示
            itemStyle: {
              normal: {
                color:'#2ab7d0'
              }
            },
            areaStyle: {
              normal: {
                color:'#25a1b7'
              }
            },
          }
        ]
      }
    },
    optionYear() {
      return{
        grid:{
          left:'0%',
          right:'3%',
          bottom:'1%',
          containLabel:true
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ['新增用户量'],
          left: 2
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine:{
            show:true,
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#f1f1f1']
            }
          },
          data: this.xDataYear  // x轴
        },
        yAxis: {
          type: 'value',
          splitLine:{
            show:true,
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#f1f1f1']
            }
          },

        },
        series: [
          {
            name: '新增用户量',
            barWidth: 25,
            nameTextStyle: {
              padding: [0, 0, 0, -10]    // 四个数字分别为上右下左与原位置距离
            },
            data: this.yDataYear,  // y轴
            type: 'bar',
            smooth: true, //是否用曲线显示
            itemStyle: {
              normal: {
                color:'#25a1b7'
              }
            },
          }
        ]
      }
    },
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),
  },

  watch: {
    isLogined(nv, ov) {
      if (nv) {
        this.initLineData(3);
        this.initLineData(4);
      }
    },
  },

  mounted() {
    if (!this.isLogined) {
      return;
    }
    this.initLineData(3);
    this.initLineData(4);
  },

  methods: {
    async initLineData(type) {
      const params = type === 3 ? this.mounthParams : this.yearParams;
      if (params.startTime > params.endTime) {
        this.$message.error("时间选择不合法,请重新选择");
        return;
      }
      const { code, data, msg } = await api.common.userDataStatistics(params);
      if (code === 200) {
        // 按年分布
        if (type === 4) {
          let __year = "";
          if (!this.currentYear.length) {
            __year = new Date().getFullYear();
          } else if (this.currentYear.length === 1) {
            __year = this.currentYear[0];
          } else {
            if (this.currentYear[0] === this.currentYear[1]) {
              __year = this.currentYear[0];
            } else {
              __year = `${this.currentYear[0]}~${this.currentYear[1]}`;
            }
          }

          let x_data = [];
          let y_data = [];
          data && data.length && data.forEach(({ count, type }) => {
            x_data.push(type + '年' );
            y_data.push(count);
          });
          this.xDataYear = x_data
          this.yDataYear = y_data
        }

        // 按月分布
        if (type === 3) {
          let __year = "";
          if (!this.currentMonth.length) {
            __year = new Date().getFullYear();
          } else if (this.currentMonth.length === 1) {
            __year = this.currentMonth[0];
          } else {
            if (this.currentMonth[0] === this.currentMonth[1]) {
              __year = this.currentMonth[0];
            } else {
              __year = `${this.currentMonth[0]}~${this.currentMonth[1]}`;
            }
          }

          let x_data = [];
          let y_data = [];
          data && data.length && data.forEach(({ count, type }) => {
            x_data.push(type + '月');
            y_data.push(count);
          });
          this.xDataMouth = x_data
          this.yDataMouth = y_data
        }

      } else {
        this.$message.error(
            (codeMessage[code] && codeMessage[code].msg) || msg,
            5
        );
      }
    },
    handleYearPanelChange(value) {
      this.currentYear = [
        dayjs(value[0]._d).format("YYYY"),
        dayjs(value[1]._d).format("YYYY"),
      ];
    },


    handleYearOpenChange(status) {
      if (
          !status &&
          this.currentYear.length > 1 &&
          (this.currentYear[0] !==
              new Date(this.yearParams.startTime).getFullYear() ||
              this.currentYear[1] !==
              new Date(this.yearParams.endTime).getFullYear())
      ) {
        this.yearParams = {
          ...this.yearParams,
          startTime: +new Date(this.currentYear[0] + ""),
          endTime: +new Date(this.currentYear[1] + ""),
        };
        this.initLineData(4);
      }
    },

    handleMonthPanelChange(value) {
      console.log(1111111, value);
      this.currentMonth = [
        dayjs(value[0]._d).format("YYYY-MM"),
        dayjs(value[1]._d).format("YYYY-MM"),
      ];
    },

    handleMounthOpenChange(status) {
      if (
          !status &&
          this.currentMonth.length > 1 &&
          (this.currentMonth[0] !==
              dayjs(this.mounthParams.startTime).format("YYYY-MM") ||
              this.currentMonth[1] !==
              dayjs(this.mounthParams.endTime).format("YYYY-MM"))
      ) {
        this.mounthParams = {
          ...this.mounthParams,
          startTime: +new Date(this.currentMonth[0] + ""),
          endTime: +new Date(this.currentMonth[1] + ""),
        };
        this.initLineData(3);
      }
    },
  },
};
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