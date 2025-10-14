// features/notice-list/model/useNoticeList.ts
"use client";
import { useState } from "react";
import { getNoticeList } from "@/entities/notice/api/getNoticeList";
import type { NoticeItem } from "@/entities/notice/model/types";

export function useNoticeList() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeList = async (page: number, size: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getNoticeList({ page, size });
      setNotices(response.data.content);
    } catch (err: any) {
      // 에러 메시지 처리
      setError(
        err.response?.data?.message || err.message || "공지사항 조회 실패"
      );
    } finally {
      setLoading(false);
    }
  };

  return { notices, loading, error, fetchNoticeList };
}
