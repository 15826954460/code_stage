<template>
  <a-form class="company-form-container" :form="form">
    <a-form-item
      label="设备地址"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'deviceMac',
          {
            initialValue: row.deviceMac || '',
            rules: [{ required: true, message: '请输入设备mac地址' }],
          },
        ]"
        placeholder="请输入设备mac地址"
      />
    </a-form-item>
    <a-form-item
      label="检测编号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectCategorys
        v-decorator="[
          'categoryId',
          {
            initialValue: row.categoryId,
            rules: [{ required: true, message: '请选择检测类别' }],
          },
        ]"
        @change="handleSelectCategorysSelectChange"
      ></SelectCategorys>
    </a-form-item>
    <a-form-item
      label="设备型号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectModel
        v-decorator="[
          'modelId',
          {
            initialValue: row.modelId,
            rules: [{ required: true, message: '请输入设备型号' }],
          },
        ]"
        @change="handleSelectModelSelectChange"
      ></SelectModel>
    </a-form-item>
    <a-form-item
      label="网关型号"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectGetaway
        v-decorator="[
          'gatewayId',
          {
            initialValue: row.gatewayId,
            rules: [{ required: true, message: '请选择网关型号' }],
          },
        ]"
        @change="handleSelectGetawaySelectChange"
      ></SelectGetaway>
    </a-form-item>
    <a-form-item
      label="设备地址"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'address',
          {
            initialValue: row.address || '',
            rules: [{ required: true, message: '请输入设备位置' }],
          },
        ]"
        placeholder="请输入设备位置"
      />
    </a-form-item>
    <a-form-item
      label="设备描述信"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-input
        v-decorator="[
          'description',
          {
            initialValue: row.description || '',
            rules: [{ required: true, message: '请输入设备描述信息' }],
          },
        ]"
        placeholder="请输入设备描述信息"
      />
    </a-form-item>
    <a-form-item
      label="设备关联建筑"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <SelectBuild
        v-decorator="[
          'buildingId',
          {
            initialValue: row.buildingId || '',
            rules: [{ required: true, message: '请选择关联建筑' }],
          },
        ]"
        @change="handleSelectBuildSelectChange"
      ></SelectBuild>
    </a-form-item>
  </a-form>
</template>

<script>
import SelectBuild from "@/components/common/SelectBuild.vue";
import SelectCategorys from "@/components/common/SelectCategorys.vue";
import SelectModel from "@/components/common/SelectModel.vue";
import SelectGetaway from "@/components/common/SelectGetaway.vue";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

export default {
  name: "EquipmentFormCom",

  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  beforeDestroy() {
    this.form.resetFields();
  },

  data() {
    return {
      formItemLayout,
      form: this.$form.createForm(this),
    };
  },

  components: {
    SelectBuild,
    SelectCategorys,
    SelectModel,
    SelectGetaway,
  },

  methods: {
    handleSelectBuildSelectChange(val) {
      this.form.setFieldsValue({ buildingId: val });
    },

    handleSelectCategorysSelectChange(val) {
      this.form.setFieldsValue({ categoryId: val });
    },

    handleSelectModelSelectChange(val) {
      this.form.setFieldsValue({ modelId: val });
    },

    handleSelectGetawaySelectChange(val) {
      this.form.setFieldsValue({ gatewayId: val });
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
