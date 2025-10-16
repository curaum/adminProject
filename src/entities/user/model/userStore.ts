// src/entities/user/model/userStore.ts
import { create } from "zustand";
import { UserInfoResponse } from "./types";
import { persist, createJSONStorage } from "zustand/middleware";
interface UserState {
  userInfo: UserInfoResponse | null;
  setUserInfo: (user: UserInfoResponse) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: "user-storage", // localStorage key
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => sessionStorage)
          : undefined,
    }
  )
);
