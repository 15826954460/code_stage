<template>
  <div class="line-box">
    <div style="margin-bottom: 10px">
      <a-range-picker
        style="margin-right: 10px"
        @panelChange="handleYearPanelChange"
        @openChange="handleYearOpenChange"
        :value="currentYear"
        :mode="['year', 'year']"
        :placeholder="['起始年', '结束年']"
        format="YYYY"
      />
      <a-range-picker
        :placeholder="['起始月', '结束月']"
        format="YYYY-MM"
        :value="currentMonth"
        :mode="['month', 'month']"
        @panelChange="handleMonthPanelChange"
        @openChange="handleMounthOpenChange"
      />
    </div>

    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import api from "@/axios/api";
import dayjs from "dayjs";
import { MOUTH_LIST } from "@/constant";
import { mapActions, mapState, createNamespacedHelpers } from "vuex";
import codeMessage from "@/constant/code-message";

export default {
  data() {
    return {
      series: [
        {
          name: "新增用户",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "用户增长：",
          align: "left",
          style: {
            fontWeight: "bold",
            fontSize: "16px",
          },
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: MOUTH_LIST.map((item) => {
            return item.lable;
          }),
        },
        yaxis: {
          title: {
            text: "单位(K)",
            style: {
              fontWeight: "bold",
              fontSize: "14px",
            },
          },
        },
      },
      mounthParams: {
        type: 3,
        startTime: +new Date(`${+new Date().getFullYear()}-01`),
        endTime: +new Date(),
      },
      yearParams: {
        type: 4,
        startTime: +new Date(`${+new Date().getFullYear() - 5} + ''`),
        endTime: +new Date(),
      },
      currentYear: [],
      currentMonth: [],
    };
  },

  computed: {
    ...mapState({
      isLogined: (state) => state.isLogined,
    }),
  },

  watch: {
    isLogined(nv, ov) {
      if (nv) {
        this.initLineData(3);
      }
    },
  },

  mounted() {
    if (!this.isLogined) {
      return;
    }
    this.initLineData(3);
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
        let __data = [];
        data &&
          data.length &&
          data.forEach(({ count, type }) => {
            __data.push(count);
          });
        this.series = [
          {
            ...this.series[0],
            data: __data,
          },
        ];
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

<style scoped>
.line-box {
  position: relative;
}
</style>
