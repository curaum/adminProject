import { NoticeDetailResponse } from "@/entities/notice/model/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import NoticeForm from "./NoticeForm";
import NoticeDetail from "./NoticeDetail";
async function fetchNoticeDetail(pid: string): Promise<NoticeDetailResponse> {
  const cookieStore = await cookies();
  const accessToken =
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("memoryToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}api/admin/notice?pid=${pid}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // cookies()에서 읽어서 넣어야 함
      },
      next: { revalidate: 60 },
    }
  );
  const text = await res.text();
  console.log("📜 Raw Response:", text);
  if (!res.ok) {
    console.error("❌ fetch 실패:", res);
    throw new Error("Failed to fetch notice detail");
  }
  return JSON.parse(text);
}

export default async function NoticeDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { mode?: string };
}) {
  // Server Component이므로 params는 동기 객체로 바로 사용 가능
  const { id } = params;
  const { mode } = searchParams;
  console.log("id, mode", id, mode);
  let notice: NoticeDetailResponse | null = null;
  try {
    notice = await fetchNoticeDetail(id);
  } catch (e) {
    console.error(e);
    return notFound();
  }
  if (mode === "edit") {
    return <NoticeForm notice={notice} />;
  }

  return <NoticeDetail notice={notice} />;
}
