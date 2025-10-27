import { apiClient } from "@/shared/api";
import { NoticeListResponse } from "../model/types";
import { AxiosResponse } from "axios";
interface GetNoticeListParams {
  page: number;
  size: number;
  accessTarget: string;
  title: string;
}

export async function getNoticeList({
  page,
  size,
  accessTarget,
  title,
}: GetNoticeListParams): Promise<AxiosResponse<NoticeListResponse>> {
  try {
    console.log("getNoticeList", page, size, accessTarget, title);
    const response = await apiClient.get("/api/admin/notice/list", {
      params: { page, size, accessTarget, title },
    });
    return response;
  } catch (err) {
    console.error("getNoticeList error", err);
    throw err; // 호출 쪽에서 catch하도록 throw
  }
}
