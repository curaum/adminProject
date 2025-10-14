import { apiClient } from "@/shared/api";
import {
  AddNoticeRequest,
  AddNoticeResponse,
} from "@/entities/notice/model/types";
import { AxiosResponse } from "axios";
export async function addNotice({
  title,
  content,
  type,
  accessTarget,
  imageUrlList,
  attachmentUrlList,
}: AddNoticeRequest): Promise<AxiosResponse<AddNoticeResponse> | null> {
  try {
    const response = await apiClient.post(`/api/admin/notice`, {
      title,
      content,
      type,
      accessTarget,
      imageUrlList,
      attachmentUrlList,
    });
    return response;
  } catch (err) {
    return null;
  }
}
