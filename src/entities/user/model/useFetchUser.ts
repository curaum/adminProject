// src/entities/user/model/useFetchUser.ts
import { useUserStore } from "./userStore";
import { getUserInfo } from "../api/getUserInfo";

export const useFetchUser = () => {
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      if (response.status === 200) {
        setUserInfo(response.data); // Zustand store 업데이트
        localStorage.setItem(
          "loginStatus",
          Math.floor(Date.now() / 1000).toString()
        );
      }
      return response;
    } catch (err) {
      console.error("Failed to fetch user info", err);
      throw err;
    }
  };

  return { fetchUserInfo };
};
