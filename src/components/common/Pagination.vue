<template>
  <a-pagination
    show-quick-jumper
    show-size-changer
    :default-current="defaultCurrent"
    :total="total"
    :page-size.sync="pageSize"
    :page-size-options="pageSizeOptions"
    :hideOnSinglePage="hideOnSinglePage"
    @showSizeChange="onShowSizeChange"
    @change="pageSizeChange"
    :show-total="(total) => `共 ${total} 条`"
  >
    <template slot="buildOptionText" slot-scope="props">
      <span v-if="props.value !== '100'">{{ props.value }}条/页</span>
      <span v-if="props.value === '100'">全部</span>
    </template>
  </a-pagination>
</template>
<script>
export default {
  name: "paginagion-com",

  props: {
    defaultCurrent: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true,
    },
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    pageSizeOptions: {
      type: Array,
      default: () => {
        return ["10", "20", "30", "50", "100", "300"];
      },
    },
  },

  data() {
    return {
      pageSize: 10,
    }
  },

  methods: {
    onShowSizeChange(currentPage, pageSize) {
      this.pageSize = pageSize;
      this.$emit("pageSizeChange", pageSize);
    },

    pageSizeChange(pageNum, pageSize) {
      this.$emit("pageNumChange", pageNum);
    }
  },
};
</script>