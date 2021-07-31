<template>
  <div class="user-manage-container">
    <a-form :form="searchForm" class="search-box">
      <a-row type="flex" :gutter="16">
        <a-col :span="6">
          <a-form-item
            label="用户名:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="用户名"
              v-decorator="['username', { initialValue: searchRow.username }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="真实姓名:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="真实姓名"
              v-decorator="['trueName', { initialValue: searchRow.trueName }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="用户角色:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <SelectUserType
              v-decorator="['userType', { initialValue: searchRow.userType }]"
              :disabled="false"
            ></SelectUserType>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="手机号:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="手机号"
              v-decorator="['phone', { initialValue: searchRow.phone }]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6">
          <a-form-item
            label="单位名称:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              placeholder="单位名称"
              v-decorator="[
                'projectName',
                { initialValue: searchRow.projectName },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            label="用户状态:"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <SelectStatus
              v-decorator="['status', { initialValue: searchRow.status }]"
            ></SelectStatus>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <div class="__flex __rfec">
            <a-button
              type="primary"
              style="margin-right: 15px"
              @click="handleSearch"
              >搜索</a-button
            >
            <a-button @click="searchForm.resetFields()">重置</a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
    <a-button
      type="primary"
      style="margin-bottom: 10px; margin-right: 15px"
      @click="add"
    >
      添加用户
    </a-button>
    <a-button
      type="primary"
      style="margin-bottom: 10px; margin-right: 15px"
      @click="getUserList"
    >
      刷新用户列表
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
      <div slot="projectName" slot-scope="text">
        <a-tag
          v-for="(item, index) in text"
          :key="`${item.id}-${index}`"
          style="margin-bottom: 3px"
        >
          {{ item.projectName }}
        </a-tag>
      </div>
      <p slot="statusTag" slot-scope="text">
        <!-- 1：正常 0：禁用 -->
        <a-tag v-if="Number(text) === 1" color="#87d068">正常</a-tag>
        <a-tag v-else color="#f50">禁用</a-tag>
      </p>
      <p slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          style="margin-right: 10px; margin-bottom: 5px"
          @click="edit(record)"
          :disabled="text === 0"
        >
          编辑
        </a-button>
        <a-popconfirm
          v-if="record.status === 1"
          :title="`确认删除当前用户${record.trueName}`"
          ok-text="确认"
          cancel-text="取消"
          @confirm="del(record)"
          @cancel="cancel"
        >
          <a-button type="danger" size="small" :disabled="text === 0">
            删除</a-button
          >
        </a-popconfirm>
      </p>
    </a-table>

    <CusModule v-if="visible" @cancel="cancel" :visible="visible" :width="800">
      <UserForm ref="uesrFormRef" :row="row"></UserForm>

      <div class="__flex __rfec">
        <a-button style="margin-right: 15px" @click="cancel"> 取消 </a-button>
        <a-button type="primary" @click="submit"> 确定 </a-button>
      </div>
    </CusModule>
  </div>
</template>

<script>
import { mapActions, mapState, createNamespacedHelpers } from "vuex";
import CusModule from "@/components/common/CusModule.vue";
import SelectUserType from "@/components/common/SelectUserType.vue";
import UserForm from "@/components/user/UserForm.vue";
import SelectStatus from "@/components/user/SelectStatus.vue";
import api from "@/axios/api";
import codeMessage from "@/constant/code-message";

const { mapActions: mapActionsUser, mapState: mapStateUser } =
  createNamespacedHelpers("user");

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "真实姓名",
    dataIndex: "trueName",
  },
  {
    title: "用户角色",
    dataIndex: "userType",
    customRender: (text, record, index) => {
      return Number(text) === 1 ? "管理员" : "普通用户";
    },
  },
  {
    title: "手机号",
    dataIndex: "phone",
  },
  {
    title: "单位名称",
    dataIndex: "projects",
    scopedSlots: { customRender: "projectName" },
  },
  {
    title: "用户状态",
    dataIndex: "status",
    scopedSlots: { customRender: "statusTag" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default {
  name: "user-manage-page",

  data() {
    return {
      dataList: [],
      columns,
      visible: false,
      row: {},
      loading: false,
      formItemLayout,
      searchForm: this.$form.createForm(this, { name: "coordinated" }),
      searchRow: {},
    };
  },

  components: {
    CusModule,
    UserForm,
    SelectStatus,
    SelectUserType,
  },

  computed: {
    ...mapStateUser({
      userInfo: (state) => state.userInfo,
    }),
  },

  mounted() {
    this.getUserList();
  },

  methods: {
    ...mapActions(["getUserListAct"]),

    async getUserList(force = true) {
      if (!force) return;
      this.loading = true;
      const { code, data, msg } = await this.getUserListAct();
      if (code === 200) {
        this.dataList = (data || []).filter((item) => {
          return !item.adminType;
        });
      }
      this.loading = false;
    },

    add() {
      this.row = {
        userType: this.userInfo.adminType ? 1 : 2,
      };
      this.visible = true;
    },

    edit(record) {
      const projectIds = record.projects.map(({ id: projectId }) => {
        return projectId;
      });
      this.row = { ...record, projectIds };
      this.visible = true;
    },

    cancel() {
      this.row = {};
      this.visible = false;
    },

    submit(e) {
      e.preventDefault();
      const __formRef = this.$refs.uesrFormRef;
      __formRef.form.validateFields(async (err, values) => {
        if (err) return;
        const { id } = this.row;
        if (id) {
          this.update({
            id,
            ...values,
          });
        } else {
          this.create({
            ...values,
          });
        }
      });
    },

    async update(values) {
      const { code } = await api.user.updateUserInfo(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getUserList();
      }
    },

    async create(values) {
      const { code } = await api.user.addUser(values);
      if (code === 200) {
        this.row = {};
        this.visible = false;
        this.getUserList();
      }
    },

    async del({ id }) {
      if (!id) return;
      const { code } = await api.user.delUser(id);
      switch (code) {
        case 10000:
          this.$message.error(codeMessage[code].msg, 5);
          break;
        default:
          this.getUserList();
          break;
      }
    },

    async handleSearch() {
      this.searchForm.validateFields(async (err, values) => {
        if (err) return;
        this.loading = true;
        const { code, data } = await this.getUserListAct(values);
        if (code === 200) {
          this.dataList = data;
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.user-manage-container {
  margin-top: 20px;
  margin-right: 10px;
}
</style>
