<template>
  <div class="building-container">
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
      <!-- <p slot="projectId" slot-scope="text">
        <ShowCompany :value="text"></ShowCompany>
      </p> -->
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

    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800">
      <BuildingForm ref="buildingFormRef" :row="row"></BuildingForm>

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
import ShowCompany from "@/components/common/ShowCompany.vue";
import BuildingForm from "@/components/building/BuildingForm.vue";
import { mapMutations } from "vuex";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "建筑名称",
    dataIndex: "buildingName",
  },
  {
    title: "楼层",
    dataIndex: "floor",
  },
  {
    title: "所属单位",
    dataIndex: "projectName"
    // dataIndex: "projectId",
    // scopedSlots: { customRender: "projectId" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "building-page",

  components: {
    CusModule,
    BuildingForm,
    // ShowCompany
  },

  data() {
    return { columns, dataList: [], loading: false, visible: false, row: {} };
  },

  created() {
    this.getBuildingList();
  },

  methods: {
    ...mapMutations['updateAllBuildList'],

    async getBuildingList(force = true) {
      if (!force) {
        // TODO:
        return;
      }
      this.loading = true;
      const { code, data } = await api.unit.getBuildingList();
      if (code === 200) {
        this.dataList = data;
        this.updateAllBuildList(data);
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
      this.$refs.buildingFormRef.form.validateFields(async (err, values) => {
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
      const { code } = await api.unit.updateBuildingList(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getBuildingList();
      }
    },

    async create(values) {
      const { code } = await api.unit.createBuildingList(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getBuildingList();
      }
    },

    async del({ id }) {
      if (!id) return;
      const { code } = await api.unit.delBuilding(id);
      if (code === 200) {
        this.getBuildingList();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.building-container {
  margin-top: 20px;
}
</style>
