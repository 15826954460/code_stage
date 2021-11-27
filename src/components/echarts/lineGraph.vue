<template>
  <div v-bind:id=id  v-bind:data=data></div>
</template>

<script>
export default {
  data(){
    return{
      ChartLineGraph:null,
    }
  },
  watch:{
    data: {
      handler(newValue, oldValue) {
        this.drawLineGraph(this.id, newValue);
      },
      deep: true
    },
  },
  props:['id','data'],
  mounted:function () {
    this.drawLineGraph(this.id,this.data);
  },
  methods:{
    drawLineGraph(id,data){
      let _this = this;
      let myChart = document.getElementById(id)
      _this.ChartLineGraph = _this.$echarts.init(myChart)  //基于准备好的dom，初始化echarts实例
      _this.ChartLineGraph.setOption(data);
      window.addEventListener('resize',function () {
        _this.ChartLineGraph.resize();
      })
    }
  },
  beforeDestroy(){
    if(this.ChartLineGraph){
      this.ChartLineGraph.clear();
    }
  },
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>

</style>