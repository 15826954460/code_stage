/**
 * @author bys
 * @date 2021-07-31 14:42:22
 * @description 服务端状态码提示信息统一维护
 */

export default {
  // 删除用户提示信息
  10000: {
    msg: "当前用户有下级用户,无法直接删除,请先删除下级用户账号",
  },
  7010: {
    msg: "管理员创建用户数量超过限制,最多只能创建5个账号",
  },
  7011: {
    msg: "一家单位(公司)只允许创建一个管理员账号",
  },
  9999: {
    msg: "当前用户名已存在",
  },
  7002: {
    msg: "当前单位下面有建筑,请先删除建筑",
  },
  9998: {
    msg: "当前手机已被使用,请重新输入",
  },
  7012: {
    msg: "当前单位下面有下级单位,不能直接删除,请先删除下级单位"
  },
  7013: {
    msg: "单位下面存在用户,请先删除用户"
  },
  6001: {
    msg: "当前建筑下绑定有设备,请先解除设备绑定"
  }
};
