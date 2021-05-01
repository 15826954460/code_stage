/**
 * @author bys
 * @date 2021-04-04 16:52:48
 * @description menu
 */
export const munus = [
  {
    key: "/",
    text: "首页",
    icon: "home"
  },
  {
    key: "sub1",
    text: "设备信息",
    icon: "deployment-unit",
    children: [
      {
        key: "/equipment",
        text: "设备列表",
      },
    ]
  },
  {
    key: "sub2",
    text: "报警系统",
    icon: "warning",
    children: [
      {
        key: "/warnning",
        text: "报警列表",
      },
    ]
  },
  {
    key: "sub3",
    text: "用户中心",
    icon: "usergroup-add",
    children: [
      {
        key: "/manage-list",
        text: "管理员",
      },
      {
        key: "/company-list",
        text: "单位管理员",
      },
      {
        key: "/agent-list",
        text: "代理用户",
      },
      {
        key: "/user-list",
        text: "普通用户",
      },
    ]
  },
  {
    key: "sub4",
    text: "配置",
    icon: "block",
    children: [
      {
        key: "/unit",
        text: "单位管理",
      },
    ]
  },
]