"use client";
import "@/shared/api/interceptors";

import { useEffect, useState } from "react";
import { useNoticeList } from "@/entities/notice/model/useNoticeList";
import Pagination from "@/shared/ui/Pagination";
export default function NoticeListPage() {
  const { notices, loading, error, fetchNoticeList } = useNoticeList();
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    console.log(`페이지 이동: ${newPage + 1}`);
    // 실제로는 여기서 서버에 요청 보내거나 데이터를 다시 불러옴
  };

  // 페이지가 마운트될 때 공지사항 리스트 호출
  useEffect(() => {
    fetchNoticeList(0, pageSize); // page=0, size=10
  }, []);

  // if (loading) return <div>로딩 중...</div>;
  // if (error) return <div>오류 발생: {error}</div>;

  return (
    <ul>
      {notices?.map((notice) => (
        <li key={notice.pid}>{notice.title}</li>
      ))}
      <Pagination
        total={300}
        pageSize={pageSize}
        page={page}
        onPageChange={handlePageChange}
      />
    </ul>
  );
}
