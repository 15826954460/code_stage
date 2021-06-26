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
      rowKey="modelId"
    >
    </a-table>

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
  },
  {
    title: "设备型号",
    dataIndex: "modelId",
  },
  {
    title: "网关型号",
    dataIndex: "gatewayId",
  },
  {
    title: "address",
    dataIndex: "设备位置",
  },
  {
    title: "描述信息",
    dataIndex: "description",
  },
  {
    title: "关联建筑",
    dataIndex: "buildingId",
  },
];

export default {
  name: "equipment-page",

  data() {
    return {
      dataList: [],
      columns,
      loading: false,
      row: {},
      visible: false,
    };
  },

  components: {
    CusModule,
    Equipment,
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
      const { code, data } = await api.equipment.getEquipmentList();
      if (code === 200) {
        this.dataList = data;
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
  },
};
</script>

<style lang='scss' scoped>
.equipment-wrapper {
  margin-top: 20px;
}
</style>
