import { useRouter } from "next/navigation";
import { useState } from "react";
import { postLogout } from "../api/logout";
import { useUserStore } from "@/entities/user/model/userStore";
import { getOS } from "@/shared/utils/getOs";
interface UseLogoutReturn {
  logout: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}
export const useLogout = (): UseLogoutReturn => {
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearCookies = () => {
    const cookieNames = ["accessToken", "memoryToken"];

    cookieNames.forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0;`;
    });
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    const os = getOS();
    try {
      await postLogout({ userPid: userInfo!.userPid, os });
      clearCookies();
      clearUserInfo();
      // 로그아웃 성공 시 /login으로 이동
      router.replace("/login");
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};
