/**
 * @author 柏运送
 * @date 2021-03-15 21:56:33
 * @description session 简易封装
 */

/** 默认缓存半小时 */
// import { CRYPTO_KEY } from "@/constant";
// import CryptoJS from "crypto-js";

// function encrypt(val) {
//   const aesVal = CryptoJS.AES.encrypt(
//     JSON.stringify(val),
//     CRYPTO_KEY
//   ).toString();
//   console.log("-------encrypt----", aesVal);
//   return aesVal;
// }

// function decrypt(val) {
//   const bytes = CryptoJS.AES.decrypt(val, CRYPTO_KEY);
//   const aesVal = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   console.log("-------decrypt----", aesVal);
//   return aesVal;
// }

export default {
  set(key, data, expired = 30) {
    if (!key || !data) return null;
    sessionStorage.setItem(key, JSON.stringify(data));
    sessionStorage.setItem(
      `${key}_expires_`,
      Date.now() + 1000 * 60 * expired + ""
    );
  },

  get(key) {
    if (!key) return;
    const expired = sessionStorage.getItem(`${key}_expires_`);
    if (expired > Date.now() > +expired) {
      this.remove(key);
      return null;
    }
    if (sessionStorage.getItem(key)) {
      return JSON.parse(sessionStorage.getItem(key));
    } else {
      return null;
    }
  },

  remove(key) {
    if (!key) return;
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(`${key}_expires_`);
  },

  clear() {
    sessionStorage.clear();
  },
};
