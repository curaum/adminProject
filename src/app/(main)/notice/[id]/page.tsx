"use client";

import { useSearchParams, useParams } from "next/navigation";

export default function NoticePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const id = params.id; // 동적 경로에서 가져온 id
  const mode = searchParams.get("mode"); // 쿼리에서 가져온 mode 값 (edit일 수도 있고 null일 수도 있음)

  return (
    <main style={{ padding: "40px" }}>
      <h1>공지사항 상세 페이지</h1>
      <p>게시글 ID: {id}</p>
      {mode === "edit" ? (
        <p style={{ color: "green" }}>현재 편집 모드입니다 ✏️</p>
      ) : (
        <p style={{ color: "gray" }}>현재 상세 보기 모드입니다 👀</p>
      )}
    </main>
  );
}
