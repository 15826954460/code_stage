<template>
  <div class="company-container">
    <a-button type="primary" size="small" style="margin-bottom: 10px" @click="createCompany"
      >新建</a-button
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
          @cancel="cancel(false)"
        >
          <a-button type="danger" size="small"> 删除</a-button>
        </a-popconfirm>
      </p>
    </a-table>
    <CusModule @cancel="cancel" :visible="visible" :width="800">
      <a-form :form="form">
        <a-form-item
          label="公司名称"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'projectName',
              {
                initialValue: row.projectName || '',
                rules: [{ required: true, message: '请输入公司名称' }],
              },
            ]"
            placeholder="请输入公司名称"
          />
        </a-form-item>
        <a-form-item
          label="公司地址"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: row.address || '',
                rules: [{ required: true, message: '请输入公司地址' }],
              },
            ]"
            placeholder="请输入公司地址"
          />
        </a-form-item>
        <a-form-item
          label="建筑物数量"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input-number
            :disabled="true"
            style="width: 100%"
            v-decorator="[
              'buildingNum',
              {
                initialValue: row.buildingNum,
                rules: [{ required: true, message: '建筑物数量' }],
              },
            ]"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="建筑物坐标"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            style="width: 100%"
            v-decorator="[
              'mapPosition',
              {
                initialValue: row.mapPosition || '',
                rules: [{ required: true, message: '建筑物坐标' }],
              },
            ]"
            :min="1"
          />
        </a-form-item>
        <a-form-item
          label="公司联系人"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          extra="多个联系人以逗号隔开 eg：张三: 123456, 李四: 123456"
        >
          <a-textarea
            v-decorator="[
              'linkmaninfo',
              {
                initialValue: row.linkmanInfo || '',
                rules: [{ required: true, message: '请输入公司联系人' }],
              },
            ]"
            placeholder="请输入公司联系人"
            :autoSize="{ minRow: 1 }"
          />
        </a-form-item>
        <div class="__flex __rfec">
          <a-button size="small" style="margin-right: 15px" @click="cancel"
            >取消</a-button
          >
          <a-button type="primary" size="small" @click="submit">确定</a-button>
        </div>
      </a-form>
    </CusModule>
  </div>
</template>

<script>
import api from "@/axios/api";
import CusModule from "@/components/common/CusModule.vue";

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
    width: 100,
  },
  {
    title: "单位地址",
    dataIndex: "address",
  },
  {
    title: "建筑数量",
    dataIndex: "buildingNum",
  },
  {
    title: "联系人",
    dataIndex: "linkmanInfo",
  },
  {
    title: "经纬度",
    dataIndex: "mapPosition",
    scopedSlots: { customRender: "mapPosition" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
export default {
  name: "company-list-page",

  components: {
    CusModule,
  },

  data() {
    return {
      formItemLayout,
      dataList: [],
      columns,
      visible: false,
      row: {},
      form: this.$form.createForm(this),
      loading: false,
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

    createCompany() {
      this.row = {};
      this.visible = true;
    },

    cancel() {
      this.form.resetFields();
      this.row = {};
      this.visible = false;
    },

    submit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        const { id } = this.row;
        if (id) {
          this.update({ id, ...values });
        } else {
          this.create(values);
        }
      });
    },

    async update(values) {
      const { code } = await api.company.updateCompanyList({ areaCode: 324 ,...values });
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.fetchList();
      }
    },

    async create(values) {
      const { code } = await api.company.createCompanyList({ areaCode: 111, ...values });
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
    }
  },
};
</script>

<style scoped lang="scss">
.company-container {
  margin-top: 20px;
}
</style>
