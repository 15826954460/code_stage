<template>
  <div class="equipment-wrapper">
    <a-button
      type="primary"
      style="margin-bottom: 10px; margin-right: 15px"
      @click="add"
    >
      新增
    </a-button>

    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="false"
      :loading="loading"
      bordered
      size="small"
      rowKey="id"
    >
      <div slot="buildName" slot-scope="text">
        <ShowBuild :value="text" />
      </div>

      <div slot="categoryName" slot-scope="text">
        <ShowCategorys :value="text" />
      </div>

      <div slot="modleName" slot-scope="text">
        <ShowModel :value="text" />
      </div>

      <div slot="getawayName" slot-scope="text">
        <ShowGetaway :value="text" />
      </div>

      <p slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          @click="edit(record)"
        >
          编辑
        </a-button>

        <a-popconfirm
          :title="`确认删除当前用户${record.trueName}`"
          ok-text="确认"
          cancel-text="取消"
          @confirm="del(record)"
          @cancel="cancel"
        >
          <a-button type="danger" size="small"> 删除</a-button>
        </a-popconfirm>
      </p>
    </a-table>

    <div class="pagination-wrap">
      <Paginagion
        :total="total"
        @pageSizeChange="pageSizeChange"
        @pageNumChange="pageNumChange"
      />
    </div>

    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800">
      <Equipment ref="equipmentFormRef" :row="row"></Equipment>

      <div class="__flex __rfec">
        <a-button style="margin-right: 15px" @click="cancel"> 取消 </a-button>
        <a-button type="primary" @click="submit"> 确定 </a-button>
      </div>
    </CusModule>
  </div>
</template>

<script>
import api from "@/axios/api";
import ShowBuild from "@/components/common/ShowBuild.vue";
import ShowCategorys from "@/components/common/ShowCategorys.vue";
import ShowModel from "@/components/common/ShowModel.vue";
import ShowGetaway from "@/components/common/ShowGetaway.vue";
import Paginagion from "@/components/common/Pagination.vue";

import CusModule from "@/components/common/CusModule.vue";
import Equipment from "@/components/equipment/Equipment.vue";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "mac地址",
    dataIndex: "deviceMac",
  },
  {
    title: "检测编号",
    dataIndex: "categoryId",
    scopedSlots: { customRender: "categoryName" },
  },
  {
    title: "设备型号",
    dataIndex: "modelId",
    scopedSlots: { customRender: "modleName" },
  },
  {
    title: "网关型号",
    dataIndex: "gatewayId",
    scopedSlots: { customRender: "getawayName" },
  },
  {
    title: "设备位置描述",
    dataIndex: "address",
  },
  {
    title: "描述信息",
    dataIndex: "description",
  },
  {
    title: "关联建筑",
    dataIndex: "buildingId",
    scopedSlots: { customRender: "buildName" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "equipment-page",

  data() {
    return {
      dataList: [],
      columns,
      loading: false,
      total: 0,
      row: {},
      visible: false,
      startPage: 1,
      pageSize: 10,
    };
  },

  components: {
    CusModule,
    Equipment,
    ShowBuild,
    ShowCategorys,
    ShowModel,
    ShowGetaway,
    Paginagion,
  },

  created() {
    this.getEquipmentList();
  },

  methods: {
    async getEquipmentList(force = true) {
      if (!force) {
        // TODO:
        return;
      }
      this.loading = true;
      const { code, data, count } = await api.equipment.getEquipmentList({
        params: {
          page: this.startPage,
          pageSize: this.pageSize,
        }
      });
      if (code === 200) {
        this.dataList = data;
        this.total = count;
      }
      this.loading = false;
    },

    cancel() {
      this.row = {};
      this.visible = false;
    },

    add() {
      this.row = {};
      this.visible = true;
    },

    edit(record) {
      this.row = record;
      this.visible = true;
    },

    async del({ id }) {
      if (!id) return;
      const { code } = await api.equipment.delEquipment(id);
      if (code === 200) {
        this.getEquipmentList();
      }
    },

    async create(values) {
      const { code } = await api.equipment.createEquipment(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getEquipmentList();
      }
    },

    async update(values) {
      const { code } = await api.equipment.updateEquipment(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getEquipmentList();
      }
    },

    submit(e) {
      e.preventDefault();
      this.$refs.equipmentFormRef.form.validateFields(async (err, values) => {
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

    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getEquipmentList();
    },

    pageNumChange(pageNum) {
      this.startPage = pageNum;
      this.getEquipmentList();
    }
  },
};
</script>

<style lang='scss' scoped>
.equipment-wrapper {
  margin-top: 20px;

  ::v-deep .ant-table-body {
    margin: 0;
  }
}

.pagination-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
