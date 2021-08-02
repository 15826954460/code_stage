<template>
  <div class="test-container">
    <div class="bread-wrap">
      <div class="area-box">
        <highcharts :options="areaChartOptions"></highcharts>
      </div>
      <div class="industry-box"></div>
    </div>
    <div class="column-box"></div>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";

export default {
  name: "data-view-page",

  components: {
    highcharts: Chart,
  },

  data() {
    return {
      areaLabel: "按地区",
      industryLabel: "按行业",
      userLabel: "用户情况",
      areaChartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "2018 年浏览器市场份额",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "Chrome",
                y: 61.41,
                sliced: true,
                selected: true,
              },
              {
                name: "Internet Explorer",
                y: 11.84,
              },
              {
                name: "Firefox",
                y: 10.85,
              },
              {
                name: "Edge",
                y: 4.67,
              },
              {
                name: "Safari",
                y: 4.18,
              },
              {
                name: "Other",
                y: 7.05,
              },
            ],
          },
        ],
      },
    };
  },

  computed: {},

  created() {},

  mounted() {},
};
</script>

<style scoped lang="scss">
.test-container {
  border: 1px solid red;
  margin-right: 10px;

  .bread-wrap {
    display: flex;
    flex-direction: row;
    .area-box,
    .industry-box {
      width: 50%;
      flex-shrink: 0;
      border: 1px solid red;
    }
  }
}
</style>
