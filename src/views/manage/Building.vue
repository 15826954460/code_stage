<template>
  <div id="building-container">
    <a-form :form="searchForm" class="search-box">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item
            label="建筑名称:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="建筑名称"
              v-decorator="[
                'buildingName',
                { initialValue: searchRow.buildingName },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="楼层:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="楼层"
              v-decorator="['floor', { initialValue: searchRow.floor }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="单位名称:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="单位名称"
              v-decorator="[
                'buildingName',
                { initialValue: searchRow.buildingName },
              ]"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="6">
          <a-form-item
            label="设备ID:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="设备ID"
              v-decorator="['deviceIds', { initialValue: searchRow.deviceIds }]"
            />
          </a-form-item>
        </a-col> -->
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <div class="__flex __rfec">
            <a-button
              type="primary"
              style="margin-right: 15px"
              @click="handleSearch"
            >
              搜索
            </a-button>
            <a-button @click="handleResetSearch">重置</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
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
      <div slot="deviceId" slot-scope="text">
        <span
          style="display: inline-block"
          v-for="(id, index) in text"
          :key="`${id}-${index}`"
        >
          <a-tooltip placement="topLeft" :title="`设备${id}详情`">
            <a-button
              size="small"
              @click="toDevicesDetail(id)"
              style="margin-bottom: 3px; margin-right: 3px; cursor: pointer"
            >
              {{ id }}
            </a-button>
          </a-tooltip>
        </span>
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
          <a-button type="danger" size="small" :disabled="disabledDelete">
            删除</a-button
          >
        </a-popconfirm>
      </p>
    </a-table>

    <div v-show="total > 0" class="__pagination-wrap">
      <Paginagion
        :total="total"
        @pageSizeChange="pageSizeChange"
        @pageNumChange="pageNumChange"
      />
    </div>

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
import Paginagion from "@/components/common/Pagination.vue";
import CusModule from "@/components/common/CusModule.vue";
import ShowCompany from "@/components/common/ShowCompany.vue";
import BuildingForm from "@/components/building/BuildingForm.vue";
import { mapActions, mapState, createNamespacedHelpers } from "vuex";

const { mapActions: mapActionsUser, mapState: mapStateUser } =
  createNamespacedHelpers("user");

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "建筑id",
    dataIndex: "id",
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
    dataIndex: "projectName",
    // dataIndex: "projectId",
    // scopedSlots: { customRender: "projectId" },
  },
  {
    title: "设备id",
    dataIndex: "deviceIds",
    scopedSlots: { customRender: "deviceId" },
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
    // ShowCompany,
    Paginagion,
  },

  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
    ...mapStateUser({
      userInfo: (state) => state.userInfo,
    }),
    disabledDelete() {
      const { adminType, userType } = this.userInfo;
      if (adminType) {
        return adminType !== 1;
      } else {
        return userType !== 1;
      }
    },
  },

  watch: {
    token: () => {
      this.getBuildingList();
    },
  },

  data() {
    return {
      columns,
      dataList: [],
      loading: false,
      visible: false,
      row: {},
      total: 0,
      startPage: 1,
      pageSize: 10,
      formItemLayout,
      searchRow: {},
      searchForm: this.$form.createForm(this, { name: "coordinated" }),
    };
  },

  mounted() {
    this.getBuildingList();
  },

  methods: {
    ...mapActions(["getAllBuildListAct"]),

    pageSizeChange({ pageSize, pageNum }) {
      this.pageSize = pageSize;
      this.startPage = pageNum;
      this.getBuildingList({ isUpdateBuildList: false });
    },

    pageNumChange({ pageSize, pageNum }) {
      this.startPage = pageNum;
      this.pageSize = pageSize;
      this.getBuildingList({ isUpdateBuildList: false });
    },

    toDevicesDetail(deviceId) {
      if (deviceId) {
        this.$router.push({
          path: "/equipmentDetail",
          query: { id: deviceId },
        });
      }
    },

    async getBuildingList({ isUpdateBuildList = true } = {}) {
      this.loading = true;
      const { code, data, count } = await api.unit.getBuildingList({
        ...this.searchRow,
        page: this.startPage,
        pageSize: this.pageSize,
      });
      if (code === 200) {
        this.total = count;
        this.loading = false;
        this.dataList = data.filter((item) => item.projectId !== 1);
        isUpdateBuildList && this.getAllBuildListAct();
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

    handleSearch() {
      this.searchForm.validateFields(async (err, values) => {
        if (err) return;
        this.searchRow = values;
        this.getBuildingList();
      });
    },

    handleResetSearch() {
      this.searchForm.resetFields();
      this.searchRow = {};
    },
  },
};
</script>

<style scoped lang="scss">
#building-container {
  margin-top: 20px;
  margin-right: 10px;
  ::v-deep .ant-table-body {
    margin: 0;
  }
}
</style>
