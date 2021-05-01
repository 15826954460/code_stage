/**
 * @author bys
 * @date 2021-03-10 21:00:13
 * @description 工具函数
 */

class Common {
  constructor() {}

  getQueryString(name, url) {
    const pattern = new RegExp(`[\\?&#]${name}=([^&#]+)`, "gi");
    const ma = (url || location.search).match(pattern);
    let strArr;
    if (ma && ma.length > 0) {
      strArr = ma[ma.length - 1].split("=");
      if (strArr && strArr.length > 1) {
        return strArr[1];
      }
      return "";
    }
    return "";
  }

  log(val) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    console.log(val);
  }
}

export default new Common();
