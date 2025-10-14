import { apiClient } from "@/shared/api";
import { NoticeListResponse } from "../model/types";
import { AxiosResponse } from "axios";
interface GetNoticeListParams {
  condition?: {
    title?: string;
    accessTarget?: string;
  };
  page: number;
  size: number;
}

export async function getNoticeList({
  page,
  size,
  condition,
}: GetNoticeListParams): Promise<AxiosResponse<NoticeListResponse>> {
  try {
    const response = await apiClient.get("/api/admin/notice/list", {
      params: { page, size, ...condition },
    });
    return response;
  } catch (err) {
    console.error("getNoticeList error", err);
    throw err; // 호출 쪽에서 catch하도록 throw
  }
}
