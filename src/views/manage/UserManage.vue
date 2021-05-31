<template>
  <div class="user-manage-container">
    <a-button
      type="primary"
      style="margin-bottom: 10px; margin-right: 15px"
      @click="add"
    >
      添加用户
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
        <a-tag v-for="(item, index) in text" :key="`${item.id}-${index}`" style="margin-bottom: 3px">
          {{ item.projectName }}
        </a-tag>
      </div>
      <p slot="statusTag" slot-scope="text">
        <a-tag v-if="Number(text) === 1" color="#f50">正常</a-tag>
        <a-tag v-else color="#2db7f5">禁用</a-tag>
      </p>
      <p slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          style="margin-right: 10px; margin-bottom: 5px"
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
import UserForm from "@/components/user/UserForm.vue";
import Register from "@/components/common/Register.vue";
import api from "@/axios/api";

const {
  mapActions: mapActionsUser,
  mapState: mapStateUser,
} = createNamespacedHelpers("user");

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
    title: "是否禁用",
    dataIndex: "status",
    scopedSlots: { customRender: "statusTag" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "user-manage-page",

  data() {
    return {
      dataList: [],
      columns,
      visible: false,
      row: {},
      loading: false,
      colorList: [
        "magenta",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple",
      ],
    };
  },

  components: {
    CusModule,
    UserForm,
    Register,
  },

  created() {},

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
      this.row = {};
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
      if (code === 200) {
        this.getUserList();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.user-manage-container {
  margin-top: 20px;
}
</style>
