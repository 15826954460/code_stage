<template>
  <div>
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
      bordered
      size="small"
      rowKey="id"
    >
      <p slot="mapPosition" slot-scope="text">
        经度：{{ text.split(",")[0] }}
        <br />
        纬度：{{ text.split(",")[1] }}
      </p>
      <p slot="industry" slot-scope="text">
        <IndustryShow :value="text"></IndustryShow>
      </p>
      <p slot="bank" slot-scope="text">
        <ShowBank :value="text"></ShowBank>
      </p>
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
    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800">
      <PersonalForm :row="row" ref="personalFormRefs"></PersonalForm>
      <div class="__flex __rfec">
        <a-button style="margin-right: 15px" @click="cancel"> 取消 </a-button>
        <a-button type="primary" @click="submit"> 确定 </a-button>
      </div>
    </CusModule>
  </div>
</template>

<script>
import api from "@/axios/api";
import { mapActions, mapState } from "vuex";
import { AREA_OBJ_DATA } from "@/constant";

import CusModule from "@/components/common/CusModule.vue";
import IndustryShow from "@/components/common/IndustryShow.vue";
import ShowBank from "@/components/common/ShowBank.vue";
import PersonalForm from "@/components/company/PersonalForm.vue";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
    width: 80,
  },
  {
    title: "姓名",
    dataIndex: "projectName",
    width: 160,
  },
  {
    title: "联系电话",
    dataIndex: "contactInfo",
    width: 160,
  },
  {
    title: "身份证号",
    dataIndex: "idCard",
    width: 160,
  },
  {
    title: "家庭住址",
    dataIndex: "address",
    width: 160,
  },
  {
    title: "行业",
    dataIndex: "businessId",
    width: 160,
  },
  {
    title: "省份",
    dataIndex: "areaCode",
    customRender: (text, record, index) => {
      return AREA_OBJ_DATA[Number(text)].label;
    },
    width: 160,
  },
  {
    title: "经纬度",
    dataIndex: "mapPosition",
    scopedSlots: { customRender: "mapPosition" },
    width: 160,
  },
  {
    title: "开户行",
    dataIndex: "bank",
    scopedSlots: { customRender: "bank" },
    width: 120,
  },
  {
    title: "银行卡号",
    dataIndex: "cardNumber",
    width: 160,
  },
  {
    title: "用户类型",
    dataIndex: "type",
    width: 160,
    customRender: (text, record, index) => {
      return Number(text) === 1 ? "代理" : "个人";
    },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "manage-page",

  components: {
    CusModule,
    PersonalForm,
    IndustryShow,
    ShowBank,
  },

  data() {
    return {
      dataList: [],
      columns,
      visible: false,
      row: {},
      loading: false,
      type: 3, // 1 普通公司 2 代理公司 3 个人代理
    };
  },

  computed: {
    ...mapState(["companyList"]),

    filterList() {
      return this.companyList.filter(item => {
        return Number(item.type) === this.type;
      })
    }
  },

  created() {
    this.fetchList(false);
  },

  mounted() {},

  methods: {
    ...mapActions(["getCompanyListAct"]),

    async fetchList(force = true) {
      this.loading = true;
      const { code, data } = await this.getCompanyListAct({ type: this.type });
      if (code === 200) {
        this.dataList = data;
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
      const __formRef = this.$refs.personalFormRefs;
      __formRef.form.validateFields(async (err, values) => {
        if (err) return;
        const { id } = this.row;
        const { areaCode: options, ...params } = values;
        const { key, label, mapPosition } = options;
        if (!mapPosition && !id) {
          console.log(1111, "no mapPosition");
          return;
        }
        if (id) {
          this.update({
            id,
            ...params,
            type: this.type,
            parentId: 1,
            mapPosition: mapPosition || this.row.mapPosition,
            areaCode: key,
          });
        } else {
          this.create({
            ...params,
            type: this.type,
            parentId: 1,
            mapPosition,
            areaCode: key,
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
  },
};
</script>
