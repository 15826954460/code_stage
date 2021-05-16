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
        path: "unit-list",
        name: "unit-page",
        component: () => import("../views/manage/Company.vue"),
      },
      {
        path: "build-list",
        name: "build-page",
        component: () => import("../views/manage/Building.vue"),
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
