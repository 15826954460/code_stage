/**
 * @author bys
 * @date 2021-03-10 21:00:13
 * @description 工具函数
 */
import { AREA_OBJ_DATA, GEO_COORD } from "@/constant";

class Common {
  constructor() { }

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

  mapProjectTree(treeList) {
    if (!treeList.length) return [];
    let __mapPositionList = [];
    let __treeList = [];
    treeList.forEach(({ areaCode, id, nums, parentId, projectName }) => {
      const __params = {};
      if (AREA_OBJ_DATA[Number(areaCode)]) {
        const __item = AREA_OBJ_DATA[Number(areaCode)];
        __params.title = `${__item.label}(${nums})`;
        __params.key = __item.label;
        __params.mapPosition = __item.geoCoord.join(',');
        __params.areaCode = Number(areaCode);
        __params.id = id;
        __params.isLeaf = nums > 0 ? false : true;
        __mapPositionList.push({
          lng: __item.geoCoord[0],
          lat: __item.geoCoord[1],
        });
        __treeList.push(__params);
      }
    });
    return { treeList: __treeList, mapPosition: __mapPositionList };
  }
}

export default new Common();
