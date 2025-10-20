import { apiClient } from "@/shared/api";
import { AxiosResponse } from "axios";

import { UpdateNoticeRequest } from "../model/types";

export async function updateNotice(
  data: UpdateNoticeRequest
): Promise<AxiosResponse<void>> {
  try {
    console.log("request body", data);
    const response = await apiClient.patch("api/admin/notice", data);
    return response;
  } catch (err) {
    console.error("updateNotice error", err);
    throw err;
  }
}
