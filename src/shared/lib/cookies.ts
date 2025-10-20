import { setCookieParams } from "../api/types";

export function setCookie(name: string, value: string, days?: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // 일 단위 설정
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  if (typeof document === "undefined") return null; // SSR 보호

  const cookies = document.cookie.split(";").map((c) => c.trim());
  const target = cookies.find((c) => c.startsWith(name + "="));
  if (!target) {
    console.log("쿠키 없음:", name);
    return null;
  }
  return target.substring(name.length + 1);
}
