"use client";
import { NoticeDetailResponse } from "@/entities/notice/model/types";
import AttachmentItem from "@/shared/ui/AttachmentItem";
import styles from "./NoticeDetailPage.module.css";
import Image from "next/image";
import Check from "@/shared/ui/Check";
import BottomNavBar from "@/shared/ui/BottomNavBar";
import { useRouter } from "next/navigation";
import { useNoticeDelete } from "@/entities/notice/model/useNoticeDelete";
export default function NoticeDetail({
  notice,
}: {
  notice: NoticeDetailResponse;
}) {
  const { handleDeleteNotice, loading } = useNoticeDelete();
  const router = useRouter();
  const accessTargetList = [
    { key: "FACTORY", label: "제조소", value: true },
    { key: "PARTNER", label: "파트너", value: true },
    { key: "PARTNER_KO", label: "국내", value: true },
    { key: "PARTNER_EN", label: "해외", value: true },
  ];
  const getTargetValue = (target: string): boolean => {
    if (target === "PARTNER") {
      return (
        notice.accessTargetList.includes("PARTNER_KO") &&
        notice.accessTargetList.includes("PARTNER_EN")
      );
    } else {
      return notice.accessTargetList.includes(target);
    }
  };

  return (
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
        <div className={styles.label}>공지 대상</div>
        <div className={styles.accessTargetList}>
          {accessTargetList.map((target) => (
            <div
              key={target.key}
              className={
                target.key === "FACTORY" ? styles["factoryTarget"] : ""
              }
              style={{ marginLeft: target.key === "PARTNER" ? "8px" : 0 }}
            >
              <Check value={getTargetValue(target.key)} text={target.label} />
            </div>
          ))}
        </div>
      </div>

      {/* 공지 대상 */}
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
      <BottomNavBar
        buttons={[
          {
            id: "delete",
            label: "공지 삭제",
            onClick: () => handleDeleteNotice(notice.pid),
            activeStyle: { borderColor: "#FC5B54", color: "#FC5B54" },
          },
          {
            id: "edit",
            label: "공지 수정",
            onClick: () => router.push(`/notice/${notice.pid}?mode=edit`),
            activeStyle: { borderColor: "#51c37e", color: "#51c37e" },
          },
        ]}
      />
    </div>
  );
}
