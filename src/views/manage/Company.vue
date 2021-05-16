<template>
  <div class="company-container">
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
        经度：{{ text.split(",")[0] }} 纬度：{{ text.split(",")[1] }}
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
      <a-select :value="type" @change="handleTabChange" style="width: 120px">
        <a-select-option :value="1"> 公司用户 </a-select-option>
        <a-select-option :value="2"> 个人用户 </a-select-option>
      </a-select>
      <CompanyForm
        v-if="type === 1 && visible"
        :row="row"
        ref="companyFormRefs"
      ></CompanyForm>

      <PersonalForm
        v-if="type === 2 && visible"
        :row="row"
        ref="personalFormRefs"
      ></PersonalForm>

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
import IndustryShow from "@/components/common/IndustryShow.vue";
import ShowBank from "@/components/common/ShowBank.vue";
import CompanyForm from "@/components/company/CompanyForm.vue";
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
    title: "单位名称",
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
    title: "所属省份",
    dataIndex: "areaCode",
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
    scopedSlots: { customRender: "bank" },
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
    title: "身份证号",
    dataIndex: "idCard",
  },
  {
    title: "用户类型",
    dataIndex: "type",
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
    CompanyForm,
    PersonalForm,
    IndustryShow,
    ShowBank
  },

  data() {
    return {
      dataList: [],
      columns,
      visible: false,
      row: {},
      loading: false,
      type: 1,
    };
  },

  computed: {},

  created() {
    this.fetchList();
  },

  mounted() {},

  methods: {
    async fetchList() {
      this.loading = true;
      const { code, data } = await api.company.getCompanyList();
      if (code === 200) {
        this.dataList = data;
      }
      this.loading = false;
    },

    edit(record) {
      this.row = record;
      this.visible = true;
    },

    handleTabChange(activeKey) {
      this.type = Number(activeKey);
    },

    createUser() {
      this.visible = true;
      this.row = {};
    },

    cancel() {
      this.row = {};
      this.visible = false;
      this.type = 1;
    },

    submit(e) {
      e.preventDefault();
      const __formRef =
        this.type === 1
          ? this.$refs.companyFormRefs
          : this.$refs.personalFormRefs;
      __formRef.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        const { id } = this.row;
        // TODO: parentId 临时数据 areaCode
        const temporary = {
          parentId: 1,
          areaCode: 222,
        };
        if (id) {
          this.update({
            id,
            ...values,
            type: this.type,
            ...temporary,
          });
        } else {
          this.create({
            ...values,
            type: this.type,
            ...temporary,
          });
        }
      });
    },

    async update(values) {
      // TODO:  临时数据 areaCode:  324,
      const { code } = await api.company.updateCompanyList({
        areaCode: 324,
        ...values,
      });
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.fetchList();
      }
    },

    async create(values) {
      // TODO: 临时数据 areaCode:  111,
      const { code } = await api.company.createCompanyList({
        areaCode: 111,
        ...values,
      });
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

<style scoped lang="scss">
.company-container {
  margin-top: 20px;
}
</style>
