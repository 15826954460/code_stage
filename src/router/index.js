import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 大屏
  {path: '/screen', name: 'screen', component: () => import('../views/screen/index.vue'), hidden: true},
  {path: '/homeScreen', name: 'screen', component: () => import('../views/screen/homeScreen.vue'), hidden: true},
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      // {
      //   path: "Test",
      //   name: "test-home",
      //   component: () => import("../views/Test.vue"),
      // },
      {
        path: "",
        name: "test-home",
        component: () => import("../views/Index"),
      },
      // 用户分布中心
      {
        path: "user-center",
        name: "user-list-page",
        component: () => import("../views/user/User.vue"),
      },
      // 操作日志
      {
        path: "option-log",
        name: "option-log-page",
        component: () => import("../views/log/OptionLog.vue"),
      },
      // 设备管理
      {
        path: "equipment-page",
        name: "equipment-page",
        component: () => import("../views/equipment/Index.vue"),
      },
      // 告警中心
      // {
      //   path: "warnning",
      //   name: "warnning-page",
      //   component: () => import("../views/warning/Index.vue"),
      // },
      // 单位管理
      {
        path: "unit-list",
        name: "unit-page",
        component: () => import("../views/manage/Company.vue"),
      },
      // 建筑管理
      {
        path: "build-list",
        name: "build-page",
        component: () => import("../views/manage/Building.vue"),
      },
      // 用户管理
      {
        path: "user-manage",
        name: "user-manage-page",
        component: () => import("../views/manage/UserManage.vue"),
      },
      // 设备展示-列表
      {
        path: "equipmentList",
        name: "equipmentList",
        component: () => import("../views/equipment/list.vue"),
      },
      // 设备管理-详情
      {
        path: "equipmentDetail",
        name: "equipmentDetail",
        component: () => import("../views/equipment/detail.vue"),
      },
      // 设备警报
      {
        path: "warning",
        name: "warning",
        component: () => import("../views/equipment/warning.vue"),
      },
      // 设备管理-分组
      {
        path: "group",
        name: "group",
        component: () => import("../views/equipment/group.vue"),
      },
      // 设备管理-历史数据
      {
        path: "history",
        name: "history",
        component: () => import("../views/equipment/history.vue"),
      },
      // 设备管理-校准日期
      {
        path: "approvedDate",
        name: "approvedDate",
        component: () => import("../views/equipment/approvedDate.vue"),
      },
      // 设备管理-导出历史数据
      {
        path: "export",
        name: "export-page",
        component: () => import("../views/export/index.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
