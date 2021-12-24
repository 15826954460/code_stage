<template>
  <div class="equipment-wrapper">
    <a-button
        type="primary"
        style="margin-bottom: 10px; margin-right: 15px"
        @click="add"
    >
      新增设备
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
            :title="`确认删除当前设备${record.deviceName}`"
            ok-text="确认"
            cancel-text="取消"
            @confirm="del(record)"
            @cancel="cancel"
        >
          <a-button type="danger" size="small"> 删除</a-button>
        </a-popconfirm>
      </p>
      <template slot="checkExpiredTime" slot-scope="text">
        <div v-if="Math.floor(((new Date(text).getTime()) - (new Date().getTime()))/ 1000 / 60 / 60 / 24) <= 30" >{{text}}
          <span class="red-hint"><a-icon type="exclamation-circle" theme="filled" />该设备校准日期将过期,请及时修改</span>
        </div>
        <div  v-else>{{text || '--' }}</div>
      </template>
    </a-table>

    <div class="pagination-wrap">
      <Paginagion
          :total="total"
          @pageSizeChange="pageSizeChange"
          @pageNumChange="pageNumChange"
      />
    </div>

    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800" :title="'设备信息'">
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
import Paginagion from "@/components/common/Pagination.vue";
import CusModule from "@/components/common/CusModule.vue";
import Equipment from "@/components/equipment/Equipment.vue";
import moment from "moment";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "mac地址",
    dataIndex: "deviceMac",
  },
  {
    title: "设备型号",
    dataIndex: "modelName",
  },
  {
    title: "网关型号",
    dataIndex: "gatewayName",
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
    dataIndex: "buildingName",
  },
  {
    title: "校准截止日期",
    dataIndex: "checkExpiredTime",
    scopedSlots: { customRender: 'checkExpiredTime' },
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
      const { code ,msg} = await api.equipment.createEquipment(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getEquipmentList();
      }else{
        this.$message.error(msg);
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
        values.checkStartTime = moment(values.checkStartTime).format('X')
        values.checkExpiredTime = moment(values.checkExpiredTime).format('X')
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

    pageSizeChange({ pageSize, pageNum }) {
      this.pageSize = pageSize;
      this.startPage = pageNum;
      this.getEquipmentList();
    },

    pageNumChange({ pageNum, pageSize }) {
      this.startPage = pageNum;
      this.pageSize = pageSize;
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
