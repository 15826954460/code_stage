<template>
  <div class="approved-date">
    <div class="back-page">
      <div class=""> <a-icon type="left" class="left-icon" @click="$router.back(-1)"/>校准日期</div>
    </div>
    <div class="content">
      <a-table :columns="columns" :data-source="data" bordered>
        <template v-for="col in ['approvedDate']" :slot="col" slot-scope="text, record">
          <div :key="col">
            <a-input v-if="record.editable" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record.key, col)"/>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => save(record.key)" style="margin-right: 20px;">保存</a>
              <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''" @click="() => edit(record.key)">修改校准日期</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from "@/axios/api";
const columns = [
  {
    title: '设备id',
    dataIndex: 'id',
    width: '15%',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: '设备名称',
    dataIndex: 'adviceName',
    width: '25%',
    scopedSlots: { customRender: 'address' },
  },
  {
    title: '校准日期',
    dataIndex: 'approvedDate',
    width: '40%',
    scopedSlots: { customRender: 'approvedDate' },
  },

  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    id: i.toString(),
    adviceName: `设备 ${i}`,
    approvedDate: '2021-12-30 12:12:12',
  });
}

export default {
  name: 'approved-date-page',

  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data,
      columns,
      editingKey: '',
    };
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
  }
}
</script>

<style lang='scss' scoped>
.approved-date{
  .back-page {
    font-size: 20px;
    color: #000;
    padding: 15px 15px 15px 5px;
    border-bottom: 5px solid #f2f2f2;

    .left-icon {
      cursor: pointer;
      padding-right: 8px;
    }
  }
  .content{
    padding-right: 10px;
  }
  .paginagion{
    text-align: right;
    margin-top: 4%;
  }
}
</style>
