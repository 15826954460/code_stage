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

// 用户角色列表
const USER_ROLE_TYPE = [
  { label: '管理员用户', value: 1, adminType: 1 },
  { label: '普通用户', value: 2, adminType: 2 },
]

// 管理员角色列表
const ADMIN_ROLE_TYPE_LIST = [
  { label: '超级管理员', value: 1, adminType: 1 },
  { label: '管理员', value: 2, adminType: 2 },
  { label: '审核员', value: 3, adminType: 3 },
  { label: '信息录入员', value: 4, adminType: 4 },
]

// 银行列表
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

// 行业列表
const INDUSTRY_LIST = [
  { label: '互联网', value: 1, industryType: 1 },
  { label: '物联网', value: 2, industryType: 2 },
  { label: '餐饮', value: 3, industryType: 3 },
  { label: '销售', value: 4, industryType: 4 },
];

const AREA_OBJ_DATA = {
  11: "北京",
  12: "天津",
  13: "河北",
  14: "山西",
  15: "内蒙古",
  21: "辽宁",
  22: "吉林",
  23: "黑龙江",
  31: "上海",
  32: "江苏",
  33: "浙江",
  34: "安徽",
  35: "福建",
  36: "江西",
  37: "山东",
  41: "河南",
  42: "湖北",
  43: "湖南",
  44: "广东",
  45: "广西",
  46: "海南",
  50: "重庆",
  51: "四川",
  52: "贵州",
  53: "云南",
  54: "西藏",
  61: "陕西",
  62: "甘肃",
  63: "青海",
  64: "宁夏",
  65: "新疆",
  71: "台湾",
  81: "香港",
  82: "澳门",
  91: "国外",
};

export {
  TOKEN,
  USER_INFO,
  CRYPTO_KEY,
  USER_ROLE_TYPE,
  DEFAULT_OPEN_KEYS,
  DEFAULT_SELECT_KEYS,
  ADMIN_ROLE_TYPE_LIST,
  BANK_LIST,
  INDUSTRY_LIST,
  AREA_OBJ_DATA
}