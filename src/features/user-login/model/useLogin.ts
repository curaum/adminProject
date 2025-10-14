"use client";
import { useRouter } from "next/navigation";
import { loginApi } from "../api/login";
import { getUserInfo } from "@/entities/user/api/getUserInfo";
import { setCookie } from "@/shared/lib/cookies";
import { useUserStore } from "@/entities/user/model/userStore";
// import { setLocale } from "@/entities/user/lib/setLocale";

export const setLocale = (locale: "ko" | "en") => {
  localStorage.setItem("locale", locale);
  document.documentElement.lang = locale;
};
const getOS = () => {
  const userAgent = navigator.userAgent;
  if (/windows/i.test(userAgent)) return "WINDOWS";
  if (/android/i.test(userAgent)) return "ANDROID";
  if (/iPad|iPhone|iPod/.test(userAgent)) return "IOS";
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent)) return "MAC";
  return "UNKNOWN";
};

export const useLogin = () => {
  const router = useRouter();

  const login = async (id: string, pw: string, isSaveId: boolean) => {
    try {
      const os = getOS();
      const response = await loginApi.login({ id, pw, os });

      if (response.status === 200) {
        const authHeader = response.headers["authorization"];
        if (authHeader?.startsWith("Bearer ")) {
          const accessToken = authHeader.slice(7);
          const keepLogin = Boolean(isSaveId);
          localStorage.setItem("keepingLogin", keepLogin.toString());
          setCookie("accessToken", accessToken, keepLogin ? 7 : 1 / 48);
        }

        const userInfoResponse = await getUserInfo();
        if (userInfoResponse.status === 200) {
          const locale =
            userInfoResponse.data.company.locale === "en_US" ? "en" : "ko";
          setLocale(locale);
          localStorage.setItem(
            "loginStatus",
            Math.floor(Date.now() / 1000).toString()
          );

          router.replace("/home");
        }
      }
    } catch (error: any) {
      console.error("Login failed", error);
    }
  };

  return { login };
};
