<template>
  <div id="company_wrapper">
    <a-button
      type="primary"
      style="margin-bottom: 10px; margin-right: 15px"
      @click="createUser"
      >添加单位</a-button
    >
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="false"
      :loading="loading"
      :row-selection="rowSelection"
      :expanded-row-keys.sync="expandedRowKeys"
      @expandedRowsChange="expandedRowsChange"
      bordered
      size="small"
      :scroll="{ x: 1500, y: 800 }"
      :rowKey="(record) => record.id"
    >
      <p slot="mapPosition" slot-scope="text">
        经度：{{ text.split(",")[0] }}
        <br />
        纬度：{{ text.split(",")[1] }}
      </p>
      <p slot="industry" slot-scope="text">
        <IndustryShow :value="text"></IndustryShow>
      </p>
      <p slot="companyShow" slot-scope="text">
        <ShowCompany :value="text"></ShowCompany>
      </p>
      <div slot="buildingId" slot-scope="text">
        <span
          style="display: inline-block"
          v-for="(id, index) in text"
          :key="`${id}-${index}`"
        >
          <a-tooltip placement="topLeft" :title="`查看建筑${id}详情`">
            <a-button
              size="small"
              style="margin-bottom: 3px; margin-right: 3px; cursor: pointer"
              @click="getBuildDetail(id)"
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
          style="margin-right: 10px; margin-bottom: 3px"
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
    <div class="__pagination-wrap">
      <Paginagion
        :total="total"
        @pageSizeChange="pageSizeChange"
        @pageNumChange="pageNumChange"
      />
    </div>
    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800">
      <CompanyForm
        ref="companyFormRefs"
        :row="row"
        :type="type"
        @updateShowMapSelect="updateShowMapSelect"
      ></CompanyForm>
      <div class="__flex __rfec">
        <a-button style="margin-right: 15px" @click="cancel"> 取消 </a-button>
        <a-button type="primary" @click="submit"> 确定 </a-button>
      </div>
    </CusModule>
    <MapPosition
      v-if="showMapSelect"
      @updateShowMapSelect="updateShowMapSelect"
      @setFormValue="setFormValue"
    ></MapPosition>
    <CusModule v-if="showBuildDetail" @cancel="closeBuildModal" :visible="showBuildDetail" :width="800">
      <BuildingForm ref="buildingFormRef" :row="buildRow"></BuildingForm>
    </CusModule>
  </div>
</template>

<script>
import api from "@/axios/api";
import { mapActions, mapState } from "vuex";
import { AREA_OBJ_DATA } from "@/constant";

import CusModule from "@/components/common/CusModule.vue";
import IndustryShow from "@/components/common/IndustryShow.vue";
import ShowCompany from "@/components/common/ShowCompany.vue";
import MapPosition from "@/components/common/MapPosition.vue";
import CompanyForm from "@/components/company/CompanyForm.vue";
import Paginagion from "@/components/common/Pagination.vue";
import BuildingForm from "@/components/building/BuildingForm.vue";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const columns = [
  {
    title: "序号",
    fixed: "left",
    width: 100,
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "单位名称",
    fixed: "left",
    width: 150,
    dataIndex: "projectName",
  },
  {
    title: "单位地址",
    dataIndex: "address",
  },
  {
    title: "营业地址",
    dataIndex: "workAddress",
  },
  {
    title: "上级公司",
    dataIndex: "parentId",
    scopedSlots: { customRender: "companyShow" },
  },
  {
    title: "省份",
    dataIndex: "areaCode",
    customRender: (text, record, index) => {
      return AREA_OBJ_DATA[Number(text)].label;
    },
  },
  {
    title: "经纬度",
    dataIndex: "mapPosition",
    scopedSlots: { customRender: "mapPosition" },
  },
  {
    title: "纳税号",
    dataIndex: "taxFileNumber",
  },
  {
    title: "开户行",
    dataIndex: "bank",
  },
  {
    title: "银行卡号",
    dataIndex: "cardNumber",
  },
  {
    title: "联系电话",
    dataIndex: "contactInfo",
  },
  {
    title: "行业",
    dataIndex: "businessId",
    scopedSlots: { customRender: "industry" },
  },
  {
    title: "官网地址",
    dataIndex: "website",
  },
  {
    title: "建筑id",
    dataIndex: "buildingIds",
    scopedSlots: { customRender: "buildingId" },
  },
  {
    title: "操作",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "manage-page",

  props: {
    type: {
      type: Number,
      default: 1, //  1 普通公司 2 代理公司(暂时不要) 3 个人代理(暂时不要)
    },
  },

  components: {
    CusModule,
    CompanyForm,
    IndustryShow,
    ShowCompany,
    MapPosition,
    Paginagion,
    BuildingForm,
  },

  data() {
    return {
      dataList: [],
      columns,
      visible: false,
      row: {},
      loading: false,
      showMapSelect: false,
      total: 0,
      startPage: 1,
      pageSize: 10,
      expandedRowKeys: [],
      rowSelection,
      showBuildDetail: false,
      buildRow: {},
    };
  },

  created() {
    this.fetchList(false);
  },

  methods: {
    ...mapActions(["getCompanyListAct", "getAllCompanyList"]),

    expandedRowsChange(expandedRowKeys) {
      this.expandedRowKeys = expandedRowKeys;
    },

    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.fetchList(false);
    },

    pageNumChange(pageNum) {
      this.startPage = pageNum;
      this.fetchList(false);
    },

    async fetchList(force = true) {
      this.loading = true;
      const { code, data, count } = await this.getCompanyListAct({
        page: this.startPage,
        pageSize: this.pageSize,
      });
      if (code === 200) {
        this.total = count;
        this.dataList = [...data].map((item) => {
          let __item = {};
          if (item.list && item.list.length > 0) {
            const { list, ...options } = item;
            __item = { children: list, ...options };
          } else {
            const { list = [], ...options } = item;
            __item = { ...options };
          }
          return __item;
        });
        force && this.getAllCompanyList();
      }
      this.loading = false;
    },

    edit(record) {
      this.row = record;
      this.visible = true;
    },

    createUser() {
      this.visible = true;
      this.row = {};
    },

    cancel() {
      this.row = {};
      this.visible = false;
    },

    submit(e) {
      e.preventDefault();
      const __formRef = this.$refs.companyFormRefs;
      __formRef.form.validateFields(async (err, values) => {
        if (err) return;
        const { id } = this.row;
        const { parentId, ...params } = values;
        if (id) {
          this.update({
            id,
            ...params,
            parentId,
          });
        } else {
          this.create({
            ...params,
            type: parentId === 1 ? this.type : 2,
            parentId,
          });
        }
      });
    },

    async update(values) {
      const { code } = await api.company.updateCompanyList(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.fetchList();
      }
    },

    async create(values) {
      const { code } = await api.company.createCompanyList(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.fetchList();
      }
    },

    async del({ id }) {
      if (!id) return;
      const { code } = await api.company.delCompanyList(id);
      if (code === 200) {
        this.fetchList();
      }
    },

    updateShowMapSelect(bool) {
      this.showMapSelect = bool;
    },

    setFormValue(val) {
      const __formRef = this.$refs.companyFormRefs;
      __formRef.form.setFieldsValue({ mapPosition: val });
    },

    async getBuildDetail(buildId) {
      const { code, data } = await api.unit.getBuildingList({ id: buildId });
      if (code === 200) {
        this.buildRow = data.building || {};
        this.showBuildDetail = true;
      }
    },

    closeBuildModal() {
      this.buildRow = {};
      this.showBuildDetail = false;
    }
  },
};
</script>

<style scoped lang="scss">
#company_wrapper {
  ::v-deep .ant-table-body {
    margin: 0;
  }
}
</style>