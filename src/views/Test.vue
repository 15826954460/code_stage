<template>
  <div class="test-container">
    <div class="bread-wrap">
      <div class="area-box">
        <div class="date-year">
          <a-range-picker
            @panelChange="handleAreaPanelChange"
            @openChange="handleAreaOpenChange"
            :value="areaCurrentYear"
            :mode="['year', 'year']"
            :placeholder="['起始年', '结束年']"
            format="YYYY"
          />
        </div>
        <apexchart
          width="500"
          type="pie"
          :options="areaChartOptions"
          :series="areaSeries"
        ></apexchart>
      </div>
      <div class="industry-box">
        <div class="date-year">
          <a-range-picker
            @panelChange="handleIndustryPanelChange"
            @openChange="handleIndustryOpenChange"
            :value="industryCurrentYear"
            :mode="['year', 'year']"
            :placeholder="['起始年', '结束年']"
            format="YYYY"
          />
        </div>
        <apexchart
          width="500"
          type="pie"
          :options="industryChartOptions"
          :series="industrySeries"
        ></apexchart>
      </div>
    </div>
    <div class="line-box">
      <lineCom></lineCom>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api";
import { AREA_OBJ_DATA, INDUSTRY_OBJ } from "@/constant";
import codeMessage from "@/constant/code-message";
import dayjs from "dayjs";
import lineCom from "@/components/dataview/line.vue";

export default {
  name: "data-view-page",

  components: {
    lineCom,
  },

  data() {
    return {
      areaCurrentYear: [],
      areaDatePickerIsopen: false,
      areaParams: {
        type: 1,
        startTime: +new Date(),
        endTime: +new Date(),
      },
      areaChartOptions: {
        labels: [],
        title: {
          text: "",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      },
      areaSeries: [],
      industryDatePickerIsopen: false,
      industryCurrentYear: [],
      industryParams: {
        type: 2,
        startTime: +new Date(),
        endTime: +new Date(),
      },
      industryChartOptions: {
        labels: [],
        title: {
          text: "",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
      },
      industrySeries: [],
    };
  },

  mounted() {
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
          let __series = [];
          let __labels = [];
          data &&
            data.length &&
            data.forEach((item) => {
              __series.push(item.count);
              AREA_OBJ_DATA[Number(item.type)] &&
                __labels.push(AREA_OBJ_DATA[Number(item.type)].label);
            });

          this.areaChartOptions = {
            ...this.areaChartOptions,
            labels: __labels,
            title: {
              ...this.areaChartOptions.title,
              text: `${__year}年用户地区分布图：`,
            },
          };
          this.areaSeries = __series;
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
          let __series = [];
          let __labels = [];
          data &&
            data.length &&
            data.forEach((item) => {
              __series.push(item.count);
              INDUSTRY_OBJ[Number(item.type)] &&
                __labels.push(INDUSTRY_OBJ[Number(item.type)]);
            });

          this.industryChartOptions = {
            ...this.industryChartOptions,
            labels: __labels,
            title: {
              ...this.industryChartOptions.title,
              text: `${__year}年用户行业分布图：`,
            },
          };
          this.industrySeries = __series;
        }
      } else {
        this.$message.error(codeMessage[code].msg, 5);
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
};
</script>

<style scoped lang="scss">
.test-container {
  margin-right: 10px;
  display: flex;
  flex-direction: column;

  .bread-wrap {
    display: flex;
    flex-direction: row;
    .area-box,
    .industry-box {
      position: relative;
      width: 50%;
      flex-shrink: 0;
      padding-top: 5px;
      .date-year {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  
    .area-box {
      margin-right: 15px;
    }
  }

  .line-box {
    margin-top: 15px;
    width: 100%;
  }
}
</style>
