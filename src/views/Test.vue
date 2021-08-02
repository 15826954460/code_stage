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
          text: "2021 年各地区用户分布",
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
            name: "地区",
            colorByPoint: true,
            data: [
              {
                name: "北京",
                y: 61.41,
                sliced: true,
                selected: true,
              },
              {
                name: "上海",
                y: 11.84,
              },
              {
                name: "广州",
                y: 10.85,
              },
              {
                name: "江西",
                y: 4.67,
              },
              {
                name: "湖北",
                y: 4.18,
              },
              {
                name: "海南",
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
