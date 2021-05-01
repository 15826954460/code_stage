
/**
 * @author 柏运送
 * @date 2021-03-15 21:56:33
 * @description localStorage 简易封装
*/

export default {
  set(key, data) {
    if (!key || !data) return;
    localStorage.setItem(key, JSON.stringify(data));
  },

  get(key) {
    if (!key) return;
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      return null;
    }
  },

  remove(key) {
    if (!key) return;
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
}