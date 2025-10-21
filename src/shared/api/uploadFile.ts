import { apiClient } from "@/shared/api";
import { AxiosResponse } from "axios";

interface uploadFileParams {
  file: any;
  domainPurpose: string;
}
export async function uploadFile({
  file,
  domainPurpose,
}: uploadFileParams): Promise<AxiosResponse> {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await apiClient.post(`api/admin/file`, formData, {
      params: { domainPurpose },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    console.error("uploadFile error", err);
    throw err;
  }
}
