import { apiClient } from "@/shared/api";
import { AxiosResponse } from "axios";

import { CreateNoticeRequest } from "../../../entities/notice/model/types";

export async function createNotice(
  data: CreateNoticeRequest
): Promise<AxiosResponse<void>> {
  try {
    console.log("request body", data);
    const response = await apiClient.post("api/admin/notice", data);
    return response;
  } catch (err) {
    console.error("updateNotice error", err);
    throw err;
  }
}
