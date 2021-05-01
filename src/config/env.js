/**
 * @author bys
 * @date 2021-03-10 20:06:45
 * @description 环境变量统一管理
 */

const { NODE_ENV, VUE_APP_ENV } = process.env;

const isDev = NODE_ENV === 'development' && VUE_APP_ENV === 'development';
const isPro = NODE_ENV === 'production' && VUE_APP_ENV === 'production';
const isTest = NODE_ENV === 'production' && VUE_APP_ENV === 'test';

export {
  isDev, isPro, isTest,
}
