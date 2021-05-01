<template>
  <a-modal
    :visible="visible"
    :title="title"
    :centered="isCenter"
    :closable="isShowClose"
    :maskClosable="false"
    :width="width"
    :footer="null"
    @cancel="$emit('cancel')"
    @ok="$emit('ok')"
  >
    <slot></slot>
  </a-modal>
</template>

<script>
export default {
  name: "module-com",

  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    isCenter: {
      type: Boolean,
      default: false,
    },
    isShowClose: {
      type: Boolean,
      default: true,
    },
    isShowFooterBorder: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 520,
    },
  },
};
</script>
