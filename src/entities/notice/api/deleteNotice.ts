import { apiClient } from "@/shared/api";
import { AxiosResponse } from "axios";

export async function deleteNotice(
  pid: number | string
): Promise<AxiosResponse<void>> {
  try {
    console.log("deleteNotice");
    const response = await apiClient.delete(`/api/admin/notice`, {
      params: { pid }, // DELETE 요청에서도 쿼리 파라미터로 전달
    });
    return response;
  } catch (err) {
    console.error("deleteNotice error", err);
    throw err;
  }
}
