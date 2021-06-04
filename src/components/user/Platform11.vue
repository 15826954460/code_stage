<template>
  <div class="platform-container" id="platformContainer">
    <a-button type="primary" style="margin-bottom: 10px" @click="createUser">
      {{ btnText }}
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
          :title="`确认删除当前用户${record.trueName}`"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmDel(record)"
          @cancel="cancel(false)"
        >
          <a-button type="danger" size="small"> 删除 </a-button>
        </a-popconfirm>
      </p>
    </a-table>
    <CusModule v-if="visible" :visible="visible" @cancel="cancel">
      <Register
        :isCreate="isCreate"
        :isEditOther="isEditOther"
        :userInfo="row"
        @cancel="cancel"
        @updateList="$emit('click')"
      ></Register>
    </CusModule>
  </div>
</template>

<script>
import api from "@/axios/api";
import CusModule from "@/components/common/CusModule.vue";
import Register from "@/components/common/Register.vue";
import { USER_ROLE_TYPE } from "@/constant";

const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => {
      return index + 1;
    },
    width: 80,
  },
  {
    title: "ID",
    dataIndex: "id",
    width: 100,
  },
  {
    title: "角色",
    dataIndex: "userType",
    customRender: (val, record, index) => {
      const list = USER_ROLE_TYPE.filter((item) => {
        return item.userType === val;
      });
      return list[0].label;
    },
  },
  {
    title: "电话",
    dataIndex: "phone",
  },
  {
    title: "姓名",
    dataIndex: "trueName",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  name: "plat-form-com",

  props: {
    roleType: {
      type: [Number, String],
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    btnText: {
      type: String,
      default: "",
    },
  },

  components: {
    CusModule,
    Register,
  },

  data() {
    return {
      columns,
      visible: false,
      row: {},
      isCreate: false,
      isEditOther: false,
    };
  },

  methods: {
    async edit(record) {
      const { id } = record;
      if (!id) {
        this.$message("没有获取到用户id");
        return;
      }
      const { code, data, msg } = await api.user.getUserInfo({ id });
      if (code === 200) {
        this.row = data;
        this.visible = true;
        this.isEditOther = true;
        this.isCreate = false;
      } else {
        this.$message(`error code: ${code} message: ${msg}`);
      }
    },

    async confirmDel({ id }) {
      if (!id) {
        this.$message("没有获取到用户id");
        return;
      }
      const { code } = await api.user.delUser(id);
      if (code === 200) {
        this.$emit("click");
      } else {
        this.$message("删除用户失败，请稍后再试");
      }
    },

    createUser() {
      this.row = { userType: this.roleType };
      this.visible = true;
      this.isEditOther = false;
      this.isCreate = true;
    },

    cancel(bool) {
      this.visible = bool;
      this.row = {};
      this.isCreate = false;
      this.isEditOther = false;
    },
  },
};
</script>

<style scoped lang="scss">
#platformContainer {
  padding-top: 20px;
  ::deep .ant-table-body {
    margin: 0;
  }
}
</style>
