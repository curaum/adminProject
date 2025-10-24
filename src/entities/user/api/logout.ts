"use client";

import { apiClient } from "@/shared/api";

interface LogoutRequest {
  userPid: number;
  os: string;
}

export const postLogout = async ({ userPid, os }: LogoutRequest) => {
  const response = await apiClient.post("api/admin/user/logout", {
    userPid,
    os,
  });
  return response;
};
