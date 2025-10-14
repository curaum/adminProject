import { apiClient } from "@/shared/api";
import { AxiosResponse } from "axios";
import type { NoticeDetailResponse } from "../model/types";
export async function getNoticeDetail(
  pid: number | string
): Promise<AxiosResponse<NoticeDetailResponse>> {
  try {
    const response = await apiClient.get(`/api/admin/notice`, {
      params: { pid },
    });
    return response; // MSW를 사용할 때는 response.data에 실제 데이터가 들어있음
  } catch (err) {
    console.error("getNoticeDetail error", err);
    throw err;
  }
}
