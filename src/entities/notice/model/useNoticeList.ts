// features/notice-list/model/useNoticeList.ts
"use client";
import { useState } from "react";
import { getNoticeList } from "@/entities/notice/api/getNoticeList";
import type { NoticeItem } from "@/entities/notice/model/types";

export function useNoticeList() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNoticeList = async (
    page: number,
    size: number,
    accessTarget: string,
    title: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getNoticeList({ page, size, accessTarget, title });
      setNotices(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (err) {
      // 에러 메시지 처리
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    notices,
    totalPages,
    totalElements,
    loading,
    error,
    fetchNoticeList,
  };
}
