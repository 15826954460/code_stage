<template>
  <!-- 添加至分组-->
  <a-modal class="group-pop"
           :visible="visible"
           @cancel="() => { $emit('cancel') }"
           @ok="() => { $emit('ok') }"
           title="添加至分组"
           :maskClosable="false"
  >
    <ul class="group-list">
      <li class="group-item"
          v-for="(item,index) in groupList"
          :key="item.id"
          :class = "isActive == index ? 'cur-group' : '' "
          @click='onCheckGroup(index,item.id)'
      >{{ item.groupName }}</li>
    </ul>

    <a-form :form="form" class="add-group" v-if="showCreatGroup" :row="row">
      <a-form-item label="">
        <a-input v-decorator="['groupName', { rules: [{ required: true, message: '请输入新分组名称' }] }]" placeholder="请输入分组名称"/>
      </a-form-item>
      <a-form-item>
        <a-button class="btn" type="primary"  @click="submit">确定</a-button>
        <a-button class="btn"  @click="showCreatGroup=false">取消</a-button>
      </a-form-item>
    </a-form>

    <template slot="footer">
      <a-button type="link" icon="plus" class="creat-g-btn" @click="add">创建新分组 </a-button>
      <a-button  type="primary" :loading="loading" @click="bindGroup">确定</a-button>
    </template>
  </a-modal>

</template>

<script>
import api from "@/axios/api";

export default {
  name: "addGroup",
  props: ['visible','deviceId'],

  data() {
    return {
      loading: false,
      groupList:[],  //分组
      isActive : -1,
      showCreatGroup:false,
      form: this.$form.createForm(this),
      groupName:'',
      hintText:false,
      row: {
        type: Object,
        default: () => {
          return {};
        },
      },
    };
  },
  created() {
    this.getGroupList();
  },
  watch:{
    getNewData:function (){
      return this.deviceId
    }
  },
  methods: {
    add() {
      this.row = {};
      this.showCreatGroup = true;
    },

    //获取分组列表
    async getGroupList() {
      this.loading = true;
      const { code, data } = await api.group.getGroupList();
      if (code === 200) {
        this.groupList = data;
      }
      this.loading = false;
    },

    submit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (err) return;
        const { id } = this.row;
        if (id) {
          this.update({
            id,
            ...values,
          });
        } else {
          this.create(values);
        }
      });
    },

    async create(values) {
      const { code } = await api.group.createGroupList(values);
      if (code === 200) {
        this.row = {};
        this.showCreatGroup = false;
        this.getGroupList();
      }
    },

    //选中当前分组
    onCheckGroup(index,id){
      //this.isActive = index;
      this.groupId = id;
      //console.log('index='+index,'-------id='+id);
      //console.log(this.groupId);
      if (index != this.isActive){
        this.isActive = index;
      }else {
        this.isActive = -1;
      }
    },

    //（绑定/解绑）设备至设备分组
    async bindGroup(force = true) {
      if (!force) { return;}
      this.loading = true;
      let params = {
        groupId: this.groupId,
        deviceIds:this.deviceId,
      }
      if(this.isActive != '-1'){
        params.type = 1
      }else {
        params.type = 2
      }
      // const { code, data, count } = await api.group.bindGroup('1',this.groupId,this.deviceId,{});
      const { code, data, count } = await api.group.bindGroup({params})
      if (code === 200) {
        this.$emit('cancel')
        this.$message.success({ content: '绑定该分组成功!' });
        //this.visible = false;
      }
      this.loading = false;
    },

  },
};
</script>

<style lang='scss' scoped>
.group-pop{
  .group-list{
    .group-item{
      line-height: 30px;
      cursor: pointer;
      padding: 0 10px;
      border-radius: 3px;
      &:hover{
         background-color: rgba(24, 144, 255, 0.15);
       }
      &.cur-group{
         background-color: rgba(24, 144, 255, 0.25);
         position: relative;
        &:before{
           content: '';
           width: 16px;
           height: 16px;
           background: url("../../assets/image/devices/check.png") no-repeat;
           background-size: contain;
           position: absolute;
           right: 15px;
           top: 6px;
         }
      }
    }
  }
  .add-group{
    width: 100%;
    border: 1px dashed #eee;
    padding: 30px 10px 0;
    text-align: center;
    input{
      border: none;
      height: 30px;
      padding: 0 10px;
      margin-right: 15px;
      border-bottom: 2px solid #1890ff;
    }
    .btn{
      margin-right: 10px;
    }
  }
  .creat-g-btn{
    float: left;
    padding-left: 0;
  }
  .text{
    font-size: 10px;
    color: red;
  }
}
</style>