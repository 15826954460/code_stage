<template>
  <div class="chart-container">
    <div id="areaBread"></div>
    <div id="industryBread"></div>
    <div id="addBrokenLine"></div>
    <div id="yearAddUseBrokenLine"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  components: {},
  data() {
    return {
      areaBread: '',
      industry: ''
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.areaBread = echarts.init(document.getElementById('areaBread'));
    this.industryBread = document.getElementById('industryBread');
    this.addBrokenLine = document.getElementById('addBrokenLine');
    this.yearAddUseBrokenLine = document.getElementById('yearAddUseBrokenLine');

  },
};
</script>

<style scoped lang="scss">
</style>
