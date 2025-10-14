import { useState } from "react";
import { getNoticeDetail } from "../api/getNoticeDetail";
import type { NoticeDetailResponse } from "./types";

export function useNoticeDetail() {
  const [notice, setNotice] = useState<NoticeDetailResponse>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeDetail = async (pid: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getNoticeDetail(pid);
      setNotice(response.data);
    } catch (err: any) {
      // 에러 메시지 처리
      setError(
        err.response?.data?.message || err.message || "공지사항 조회 실패"
      );
    } finally {
      setLoading(false);
    }
  };
}
