import CryptoJS from "crypto-js";
const key = CryptoJS.enc.Utf8.parse(
  "a9c48a9af6d0ae2b0a198c43077385d8" //"a9c48a9af6d0ae2b0a198c43077385d8fa628995391c9e55"
);
const iv = CryptoJS.enc.Utf8.parse("a12653f4f6b4d93b");

// function encrypt(params) {
//   // AES256 암호화
//   return CryptoJS.AES.encrypt(JSON.stringify(params), key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC
//   }).toString();
// }
function encrypt(params) {
  // AES256 암호화
  return CryptoJS.AES.encrypt(params, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
  }).toString();
}
function decrypt(params) {
  // AES256 복호화
  return JSON.parse(
    CryptoJS.AES.decrypt(params, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      adding: CryptoJS.pad.ZeroPadding,
    }).toString(CryptoJS.enc.Utf8)
  );
}
function password(params) {
  // SHA256 해시암호화
  return CryptoJS.SHA256(params).toString().toUpperCase();
}
export default { encrypt, decrypt, password };
