import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "",
        name: "test-home",
        component: () => import("../views/Test.vue"),
      },
      {
        path: "agent-list",
        name: "agent-list-page",
        component: () => import("../views/user/Agent.vue"),
      },
      {
        path: "user-center",
        name: "user-list-page",
        component: () => import("../views/user/User.vue"),
      },
      {
        path: "option-log",
        name: "option-log-page",
        component: () => import("../views/user/OptionLog.vue"),
      },
      {
        path: "equipment-page",
        name: "equipment-page",
        component: () => import("../views/equipment/Index.vue"),
      },
      {
        path: "warnning",
        name: "warnning-page",
        component: () => import("../views/warning/Index.vue"),
      },
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
      }
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
