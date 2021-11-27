<template>
  <div v-bind:id=id  v-bind:seriesData=seriesData></div>
</template>

<script>
  export default {
    data(){
      return{
        ChartPieGraph:null,
      }
    },
    watch:{
      seriesData: {
        handler(newValue, oldValue) {
          this.drawPieGraph(this.id, newValue);
        },
        deep: true
      },
    },
    props:['id','seriesData'],
    mounted:function () {
      this.drawPieGraph(this.id,this.seriesData);
    },
    methods:{
      drawPieGraph(id,seriesData){
        let _this = this;
        let myChart = document.getElementById(id)
        this.ChartPieGraph = this.$echarts.init(myChart)  //基于准备好的dom，初始化echarts实例
        var  option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: seriesData,
              color: ['#51CEC6', '#FFB703', '#5FA0FA', '#f55066', '#3FBF7F', '#3FBFBF', '#A86FE1', '#fe9778', '#A8E16F'],
            }
          ]
        };
        this.ChartPieGraph.setOption(option);
        window.addEventListener('resize',function () {
          _this.ChartPieGraph.resize();
        })
      }
    },
    beforeDestroy(){
      if(this.ChartPieGraph){
        this.ChartPieGraph.clear();
      }
    },
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>

</style>