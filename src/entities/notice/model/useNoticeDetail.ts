import { useState } from "react";
import { getNoticeDetail } from "../api/getNoticeDetail";

export function useNoticeDetail() {
  const [notice, setNotice] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNoticeDetail = async (pid: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getNoticeDetail(pid);
      setNotice(response.data);
    } catch (err) {
      // 에러 메시지 처리
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    notice,
    loading,
    error,
    fetchNoticeDetail,
  };
}
