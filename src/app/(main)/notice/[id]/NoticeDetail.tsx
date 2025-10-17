import { NoticeDetailResponse } from "@/entities/notice/model/types";
import AttachmentItem from "@/shared/ui/AttachmentItem";
import styles from "./NoticeDetailPage.module.css";
import Image from "next/image";

export default function NoticeDetail({
  notice,
}: {
  notice: NoticeDetailResponse;
}) {
  return (
    <div className={styles.lightgrayText}>
      <div className={styles.container}>
        {/* 제목 */}
        <div className={styles.cardRow}>
          <div className={styles.label}>중요</div>
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
            <div className={styles.label}>제목</div>
            <div className={styles.titleText}>{notice.title}</div>
          </div>{" "}
        </div>

        {/* 작성일 */}
        <div className={styles.cardRow}>
          <div className={styles.label}>작성일시</div>
          <div className={styles.createdAtText}>
            {new Date(notice.createdAt).toLocaleString()}
          </div>
        </div>

        {/* 내용 */}
        <div
          className={styles.contentBox}
          dangerouslySetInnerHTML={{ __html: notice.content }}
        />

        {/* 첨부파일 */}
        {notice.attachmentList?.map((item) => (
          <AttachmentItem key={item.url} item={item} isEn={false} />
        ))}
      </div>
    </div>
  );
}
