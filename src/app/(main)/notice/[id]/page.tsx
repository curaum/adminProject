import { NoticeDetailResponse } from "@/entities/notice/model/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import styles from "./NoticeDetailPage.module.css";
import AttachmentItem from "@/shared/ui/AttachmentItem";
import Image from "next/image";
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
    <main>
      <div className={styles.lightgrayText}>
        <div className={styles.container}>
          <div className={styles.flexColumn}>
            <div className={styles.cardRow}>
              <div className={styles.title}>
                <div className={styles.titleLabel}>중요</div>
                <div className={styles.titleTextContainer}>
                  <div className={styles.importantImage}>
                    {notice.type === "IMPORTANT" ? (
                      <Image
                        src="/images/switch_enable.svg"
                        width={52}
                        height={32}
                        alt="important"
                      />
                    ) : (
                      <Image
                        src="/images/switch_disable.svg"
                        width={52}
                        height={32}
                        alt="unimportant"
                      />
                    )}
                  </div>
                  <div className={styles.titleLabel}>제목</div>
                  <div className={styles.titleText}>{notice.title}</div>
                </div>
              </div>
            </div>

            <div className={styles.cardRow}>
              <div>작성일시</div>
              <div
                className="d-flex align-center"
                style={{ marginLeft: "8px" }}
              >
                <div className={styles.createdAtText}>
                  {new Date(notice.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.contentBox}
            dangerouslySetInnerHTML={{ __html: notice.content }}
          />

          {notice.attachmentList?.map((item) => (
            <AttachmentItem key={item.url} item={item} isEn={false} />
          ))}
        </div>
      </div>
    </main>
  );
}
