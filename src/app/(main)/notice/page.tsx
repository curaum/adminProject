"use client";
import "@/shared/api/interceptors";

import { useEffect } from "react";
import { useNoticeList } from "@/entities/notice/model/useNoticeList";

export default function NoticeListPage() {
  const { notices, loading, error, fetchNoticeList } = useNoticeList();

  // 페이지가 마운트될 때 공지사항 리스트 호출
  useEffect(() => {
    fetchNoticeList(0, 10); // page=0, size=10
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <ul>
      {notices?.map((notice) => (
        <li key={notice.pid}>{notice.title}</li>
      ))}
    </ul>
  );
}
