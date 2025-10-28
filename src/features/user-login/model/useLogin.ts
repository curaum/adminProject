"use client";
import { useRouter } from "next/navigation";
import { loginApi } from "../api/login";
import { getUserInfo } from "@/entities/user/api/getUserInfo";
import { setCookie } from "@/shared/lib/cookies";
import { useFetchUser } from "@/entities/user/model/useFetchUser";
import { getOS } from "@/shared/utils/getOs";

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
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return { login };
};
