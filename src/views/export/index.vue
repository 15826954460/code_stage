<template>
<div class="export">
  <div class="back-page">
    <div class="">
      <a-icon type="left" class="left-icon" @click="$router.back(-1)"/>
      已导出的历史数据  <span>仅保留过去 7 天的导出记录。</span></div>
  </div>
  <div class="content">
    <a-table bordered :data-source="data" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
            v-if="data.length"
            title="Sure to delete?"
            @confirm="() => onDelete(record.key)"
        >
          <a href="javascript:;">下载</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</div>
</template>

<script>
const columns = [
  {
    title: '文件名',
    dataIndex: 'name',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
const data = [...Array(20)].map((_, i) => ({
  key: i,
  name: `设备 ${i+1}`,
  status: '离线',
  time:'2021/6/28 16:30'
}));

export default {
  name: "index",
  data() {
    return {
      data,
      columns,
    }
  },
  methods:{
    onDelete(key) {
      const data = [...this.data];
      this.data = data.filter(item => item.key !== key);
    },
  }
}
</script>

<style lang='scss' scoped>
.export{
  .back-page{
    font-size: 20px;
    color: #000;
    padding: 15px 15px 15px 5px;
    border-bottom: 5px solid #f2f2f2;
    .left-icon{
      cursor: pointer;
      padding-right: 8px;
    }
    span{
      font-size: 12px;
      color: #000;
      opacity: .5;
      line-height: 1;
      margin-left: 15px;
    }
  }
  .content{
  padding-right: 10px;
  }
}
</style>