import { apiClient } from "@/shared/api";
import { AxiosResponse } from "axios";

export interface FileDTO {
  realName: string;
  virtualName: string;
  contentType: string;
  fileSize: number;
}

export interface UpdateNoticeRequest {
  pid: number;
  title: string;
  content: string;
  type: "IMPORTANT" | "NORMAL";
  accessTargetList: string[]; // ["PARTNER_KO", "FACTORY"] 형태
  imageFileDTOList?: FileDTO[];
  attachmentFileDTOList?: FileDTO[];
}

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
