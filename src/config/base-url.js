/**
 * @author bys
 * @date 2021-03-10 20:07:59
 * @description url
 */

import { isPro, isTest } from './env';

let baseUrl = '';

if (isTest) {
  baseUrl = 'http://47.100.25.58:8080/';
}

if (isPro) {
  // baseUrl = 'https://template.wps.com/client-server';
}

export {
  baseUrl,
};
