"use client";

import { apiClient } from "@/shared/api";
import type { UserInfoResponse } from "../model/types";
import { AxiosResponse } from "axios";

export const getUserInfo = async (): Promise<
  AxiosResponse<UserInfoResponse>
> => {
  const response = await apiClient.get("api/user");
  return response;
};
