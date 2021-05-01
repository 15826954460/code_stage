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

const BANK_LIST = [
  { label: '工商银行', value: 1, bankType: 1 },
  { label: '农业银行', value: 2, bankType: 2 },
  { label: '商业银行', value: 3, bankType: 3 },
  { label: '建设银行', value: 4, bankType: 4 },
  { label: '中国银行', value: 5, bankType: 5 },
  { label: '邮政银行', value: 6, bankType: 6 },
  { label: '交通银行', value: 7, bankType: 7 },
  { label: '浦发银行', value: 8, bankType: 8 },
  { label: '民生银行', value: 9, bankType: 9 },
  { label: '招商银行', value: 10, bankType: 10 },
  { label: '华夏银行', value: 11, bankType: 11 },
  { label: '广发银行', value: 12, bankType: 12 },
  { label: '平安银行', value: 13, bankType: 13 },
  { label: '兴业银行', value: 14, bankType: 14 },
]

export {
  TOKEN,
  USER_INFO,
  CRYPTO_KEY,
  USER_ROLE_TYPE,
  DEFAULT_OPEN_KEYS,
  DEFAULT_SELECT_KEYS,
  ADMIN_ROLE_TYPE_LIST,
  BANK_LIST
}