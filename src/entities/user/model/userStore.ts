// src/entities/user/model/userStore.ts
import { create } from "zustand";
import { UserInfoResponse } from "./types";

interface UserState {
  userInfo: UserInfoResponse | null;
  setUserInfo: (user: UserInfoResponse) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  setUserInfo: (user) => set({ userInfo: user }),
  clearUserInfo: () => set({ userInfo: null }),
}));
