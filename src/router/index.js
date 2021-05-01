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
        path: "manage-list",
        name: "manage-list-page",
        component: () => import("../views/user/Manage.vue"),
      },
      {
        path: "company-list",
        name: "company-list-page",
        component: () => import("../views/user/Company.vue"),
      },
      {
        path: "agent-list",
        name: "agent-list-page",
        component: () => import("../views/user/Agent.vue"),
      },
      {
        path: "user-list",
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
      {
        path: "unit",
        name: "unit-manage-page",
        component: () => import("../views/base-manage/Company.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
