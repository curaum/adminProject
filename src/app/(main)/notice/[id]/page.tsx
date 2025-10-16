import { NoticeDetailResponse } from "@/entities/notice/model/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getNoticeDetail } from "@/entities/notice/api/getNoticeDetail";
async function fetchNoticeDetail(pid: string): Promise<NoticeDetailResponse> {
  const cookieStore = await cookies();
  console.log("🍪 쿠키:", cookieStore);
  const accessToken =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("memoryToken")?.value;
  console.log("🔑 accessToken:", accessToken);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/admin/notice?pid=${pid}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // cookies()에서 읽어서 넣어야 함
      },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    console.error("❌ fetch 실패:", res);
    throw new Error("Failed to fetch notice detail");
  }
  return res.json();
}

export default async function NoticeDetailPage({
  params,
}: {
  params: { id: string; mode?: string };
}) {
  // Server Component이므로 params는 동기 객체로 바로 사용 가능
  const { id, mode } = params;
  let notice: NoticeDetailResponse | null = null;
  try {
    notice = await fetchNoticeDetail(id);
  } catch (e) {
    console.error(e);
    return notFound();
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>공지사항 상세 페이지</h1>
      <p>게시글 ID: {id}</p>
      <div dangerouslySetInnerHTML={{ __html: notice.content }} />
      {mode === "edit" ? (
        <p style={{ color: "green" }}>현재 편집 모드입니다 ✏️</p>
      ) : (
        <p style={{ color: "gray" }}>현재 상세 보기 모드입니다 👀</p>
      )}
    </main>
  );
}
