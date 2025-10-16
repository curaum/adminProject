"use client";
import { useRouter } from "next/navigation";
import { loginApi } from "../api/login";
import { getUserInfo } from "@/entities/user/api/getUserInfo";
import { setCookie } from "@/shared/lib/cookies";
import { useFetchUser } from "@/entities/user/model/useFetchUser";
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
  const { fetchUserInfo } = useFetchUser();

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

        await fetchUserInfo();
        router.replace("/notice");
      }
    } catch (error: any) {
      console.error("Login failed", error);
    }
  };

  return { login };
};
