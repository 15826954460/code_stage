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

const TAG_COLOR_LIST = [
  "magenta",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

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

// 操作状态
const OPERATION_STATUS = {
  '1': '待审核',
  '2': '审核通过',
  '3': '已移除',
  '4': '移除'
}

// 公司列表划分
const COMPANY_TYPE = {
  1: '普通公司',
  2: '公司代理',
  3: '个人代理'
}

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
  { label: '食品', value: 1, industryType: 1 },
  { label: '制药', value: 2, industryType: 2 },
  { label: '冷链', value: 3, industryType: 3 },
  { label: '仓储', value: 4, industryType: 4 },
  { label: '医药流通', value: 5, industryType: 5 },
  { label: '商超', value: 6, industryType: 6 },
  { label: '油气', value: 7, industryType: 7 },
  { label: '化工', value: 8, industryType: 8 },
  { label: '冶金', value: 9, industryType: 9 },
  { label: '建材', value: 10, industryType: 10 },
  { label: '科研教育机构', value: 11, industryType: 11 },
  { label: '环保', value: 12, industryType: 12 },
  { label: '机械制造', value: 13, industryType: 13 },
  { label: '汽车', value: 14, industryType: 14 },
  { label: '建筑', value: 15, industryType: 15 },
  { label: '能源', value: 16, industryType: 16 },
  { label: '电子', value: 17, industryType: 17 },
  { label: '化妆平', value: 18, industryType: 18 },
  { label: '其他', value: 19, industryType: 19 },
];

// 树形列表
const AREA_OBJ_DATA = {
  11: { label: "北京", geoCoord: [116.46, 39.92] },
  12: { label: "天津", geoCoord: [117.2, 39.133] },
  13: { label: "河北", geoCoord: [114.48, 38.03] },
  14: { label: "山西", geoCoord: [112.53, 37.87] },
  15: { label: "内蒙古", geoCoord: [111.65, 40.82] },
  21: { label: "辽宁", geoCoord: [123.38, 41.8] },
  22: { label: "吉林", geoCoord: [125.35, 43.88] },
  23: { label: "黑龙江", geoCoord: [126.63, 45.75] },
  31: { label: '上海', geoCoord: [121.48, 31.22] },
  32: { label: '江苏', geoCoord: [118.78, 32.04] },
  33: { label: '浙江', geoCoord: [120.19, 30.26] },
  34: { label: '安徽', geoCoord: [117.27, 31.86] },
  35: { label: '福建', geoCoord: [119.3, 26.08] },
  36: { label: '江西', geoCoord: [115.89, 28.68] },
  37: { label: '山东', geoCoord: [117, 36.65] },
  41: { label: '河南', geoCoord: [113.65, 34.76] },
  42: { label: '湖北', geoCoord: [114.31, 30.52] },
  43: { label: '湖南', geoCoord: [113, 28.21] },
  44: { label: '广东', geoCoord: [113.23, 23.16] },
  45: { label: '广西', geoCoord: [108.33, 22.84] },
  46: { label: '海南', geoCoord: [110.35, 20.02] },
  50: { label: '重庆', geoCoord: [106.54, 29.59] },
  51: { label: '四川', geoCoord: [104.06, 30.67] },
  52: { label: '贵州', geoCoord: [106.71, 26.57] },
  53: { label: '云南', geoCoord: [102.73, 25.04] },
  54: { label: '西藏', geoCoord: [91.11, 29.97] },
  61: { label: '陕西', geoCoord: [108.95, 34.27] },
  62: { label: '甘肃', geoCoord: [103.73, 36.03] },
  63: { label: '青海', geoCoord: [101.74, 36.56] },
  64: { label: '宁夏', geoCoord: [106.27, 38.47] },
  65: { label: '新疆', geoCoord: [87.68, 43.77] },
  71: { label: '台湾', geoCoord: [121.30, 25.03] },
  81: { label: '香港', geoCoord: [114.17, 22.28] },
  82: { label: '澳门', geoCoord: [113.54, 22.19] },
  // 91: "国外",
};

/* 各省份的省会坐标[经度,纬度] */
const GEO_COORD = [
  // 23省
  { label: '甘肃', geoCoord: [103.73, 36.03], areaCode: 62 },
  { label: '青海', geoCoord: [101.74, 36.56], areaCode: 63 },
  { label: '四川', geoCoord: [104.06, 30.67], areaCode: 51 },
  { label: '河北', geoCoord: [114.48, 38.03], areaCode: 13 },
  { label: '云南', geoCoord: [102.73, 25.04], areaCode: 53 },
  { label: '贵州', geoCoord: [106.71, 26.57], areaCode: 52 },
  { label: '湖北', geoCoord: [114.31, 30.52], areaCode: 42 },
  { label: '河南', geoCoord: [113.65, 34.76], areaCode: 41 },
  { label: '山东', geoCoord: [117, 36.65], areaCode: 37 },
  { label: '江苏', geoCoord: [118.78, 32.04], areaCode: 32 },
  { label: '安徽', geoCoord: [117.27, 31.86], areaCode: 34 },
  { label: '浙江', geoCoord: [120.19, 30.26], areaCode: 33 },
  { label: '江西', geoCoord: [115.89, 28.68], areaCode: 36 },
  { label: '福建', geoCoord: [119.3, 26.08], areaCode: 35 },
  { label: '广东', geoCoord: [113.23, 23.16], areaCode: 44 },
  { label: '湖南', geoCoord: [113, 28.21], areaCode: 43 },
  { label: '海南', geoCoord: [110.35, 20.02], areaCode: 46 },
  { label: '辽宁', geoCoord: [123.38, 41.8], areaCode: 21 },
  { label: '吉林', geoCoord: [125.35, 43.88], areaCode: 22 },
  { label: '黑龙江', geoCoord: [126.63, 45.75], areaCode: 23 },
  { label: '山西', geoCoord: [112.53, 37.87], areaCode: 14 },
  { label: '陕西', geoCoord: [108.95, 34.27], areaCode: 61 },
  { label: '台湾', geoCoord: [121.30, 25.03], areaCode: 71 },
  // 4直辖市
  { label: '北京', geoCoord: [116.46, 39.92], areaCode: 11 },
  { label: '上海', geoCoord: [121.48, 31.22], areaCode: 31 },
  { label: '重庆', geoCoord: [106.54, 29.59], areaCode: 50 },
  { label: '天津', geoCoord: [117.2, 39.13], areaCode: 12 },
  // 5自治区
  { label: '内蒙古', geoCoord: [111.65, 40.82], areaCode: 15 },
  { label: '广西', geoCoord: [108.33, 22.84], areaCode: 45 },
  { label: '西藏', geoCoord: [91.11, 29.97], areaCode: 54 },
  { label: '宁夏', geoCoord: [106.27, 38.47], areaCode: 64 },
  { label: '新疆', geoCoord: [87.68, 43.77], areaCode: 65 },
  // 2特别行政区
  { label: '香港', geoCoord: [114.17, 22.28], areaCode: 81 },
  { label: '澳门', geoCoord: [113.54, 22.19], areaCode: 82 }
]

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
  AREA_OBJ_DATA,
  GEO_COORD,
  COMPANY_TYPE,
  OPERATION_STATUS,
  TAG_COLOR_LIST,
}