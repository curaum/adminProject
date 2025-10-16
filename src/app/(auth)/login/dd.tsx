"use client";
import { NoticeDetailResponse } from "@/entities/notice/model/types";
import { useNoticeDetail } from "@/entities/notice/model/useNoticeDetail";
import { useEffect } from "react";
import React from "react";
// async function fetchNoticeDetail2(pid: string): Promise<NoticeDetailResponse> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/notice?pid=${pid}`,
//     {
//       // 캐시 전략
//       next: { revalidate: 60 }, // ISR: 60초마다 캐시 갱신
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch notice detail");
//   }

//   const data = await res.json();
//   console.log("✅ [getWorkoutDays] 응답 데이터:", data);

//   return data;
// }

export default function NoticeDetailPage({
  params,
}: {
  params: { id: string; mode?: string };
}) {
  const { id, mode } = params;
  const { notice, fetchNoticeDetail } = useNoticeDetail();
  useEffect(() => {
    fetchNoticeDetail(Number(id));
  }, [id]);

  return (
    <main style={{ padding: "40px" }}>
      <h1>공지사항 상세 페이지</h1>
      <p>게시글 ID: {id}</p>
      {notice.content}
      {mode === "edit" ? (
        <p style={{ color: "green" }}>현재 편집 모드입니다 ✏️</p>
      ) : (
        <p style={{ color: "gray" }}>현재 상세 보기 모드입니다 👀</p>
      )}
    </main>
  );
}
