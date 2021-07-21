<template>
<div class="group-page">
  <div class="back-page">
    <div class=""> <a-icon type="left" class="left-icon" @click="$router.back(-1)"/>分组管理</div>
  </div>
  <div class="content">
    <a-button type="primary" class="add-btn"  @click="add">添加分组</a-button>

    <a-table
        :columns="columns"
        :data-source="dataList"
        :pagination="false"
        :loading="loading"
        bordered
        size="small"
        rowKey="id"
    >
      <p slot="action" slot-scope="text, record">
        <a-button type="primary" size="small" style="margin-right: 10px" @click="edit(record)"> 编辑 </a-button>

        <a-popconfirm :title="`确认删除当前用户${record.groupName}`" ok-text="确认" cancel-text="取消" @confirm="del(record)" @cancel="cancel">
          <a-button type="danger" size="small"> 删除</a-button>
        </a-popconfirm>
      </p>
    </a-table>

    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800">
      <div>分组</div>
      <groupForm ref="groupFormRef" :row="row"></groupForm>

      <div class="__flex __rfec">
        <a-button style="margin-right: 15px" @click="cancel"> 取消 </a-button>
        <a-button type="primary" @click="submit"> 确定 </a-button>
      </div>
    </CusModule>

  </div>
</div>
</template>

<script>
import api from "@/axios/api";
import CusModule from "@/components/common/CusModule.vue";
import groupForm from "@/components/equipment/groupForm.vue";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "分组名称",
    dataIndex: "groupName",
  },
  {
    title: "设备数",
    dataIndex: "num",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "group",

  components: {
    CusModule,
    groupForm,
  },
  data() {
    return {
      columns,
      dataList: [],
      loading: false,
      visible: false,
      row: {},
    };
  },
  computed: {},
  created() {
    this.getGroupList();
  },
  mounted() {},
  methods: {
    async getGroupList(force = true) {
      console.log(111, '------getGroupList');
      if (!force) {
        // TODO:
        return;
      }
      this.loading = true;
      const { code, data } = await api.group.getGroupList();
      if (code === 200) {
        this.dataList = data;
      }
      this.loading = false;
    },

    add() {
      this.row = {};
      this.visible = true;
    },

    cancel() {
      this.row = {};
      this.visible = false;
    },

    edit(record) {
      this.row = record;
      this.visible = true;
    },

    submit(e) {
      e.preventDefault();
      this.$refs.groupFormRef.form.validateFields(async (err, values) => {
        if (err) return;
        const { id } = this.row;
        if (id) {
          this.update({
            id,
            ...values,
          });
        } else {
          this.create(values);
        }
      });
    },

    async update(values) {
      const { code } = await api.group.updateGroupList(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getGroupList();
      }
    },

    async create(values) {
      const { code } = await api.group.createGroupList(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getGroupList();
      }
    },

    async del({ id }) {
      if (!id) return;
      const { code } = await api.group.delGroup(id);
      if (code === 200) {
        this.getGroupList();
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.group-page{
  .back-page{
    font-size: 20px;
    color: #000;
    padding: 15px 15px 15px 5px;
    border-bottom: 5px solid #f2f2f2;
    .left-icon{
      cursor: pointer;
      padding-right: 8px;
    }
  }
  .content{
    padding-right: 10px;
    .add-btn{
      margin: 15px 0;
    }
  }
}
</style>