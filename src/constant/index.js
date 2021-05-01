/**
 * @author bys
 * @date 2021-03-24 19:30:05
 * @description 常量表维护
 */
const CRYPTO_KEY = "bys_javascript_2021";
const TOKEN = "TOKEN";
const USER_INFO = "USER_INFO";

const DEFAULT_SELECT_KEYS = "DEFAULT_SELECT_KEYS";
const DEFAULT_OPEN_KEYS = "DEFAULT_OPEN_KEYS";

const USER_ROLE_TYPE = [
  { label: '管理员', value: 1, adminType: 1 },
  { label: '普通用户', value: 2, adminType: 2 },
]

const ADMIN_ROLE_TYPE_LIST = [
  { label: '超级管理员', value: 1, adminType: 1 },
  { label: '管理员', value: 2, adminType: 2 },
  { label: '审核员', value: 3, adminType: 3 },
  { label: '信息录入员', value: 4, adminType: 4 },
]

export {
  TOKEN,
  USER_INFO,
  CRYPTO_KEY,
  USER_ROLE_TYPE,
  DEFAULT_OPEN_KEYS,
  DEFAULT_SELECT_KEYS,
  ADMIN_ROLE_TYPE_LIST,
}