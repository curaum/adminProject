"use client";

import { NoticeDetailResponse } from "@/entities/notice/model/types";
import { useState } from "react";
import styles from "./NoticeDetailPage.module.css";
import Image from "next/image";
import AttachmentItem from "@/shared/ui/AttachmentItem";
export default function NoticeForm({
  notice,
}: {
  notice: NoticeDetailResponse;
}) {
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);

  const handleSave = () => {
    console.log("저장할 데이터:", { title, content });
    // TODO: PUT /api/admin/notice API 호출
  };

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
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.titleInput} ${styles.titleText}`}
            />
          </div>
        </div>

        {/* 작성일 */}
        <div className={styles.cardRow}>
          <div>작성일시</div>
          <div className={styles.createdAtText}>
            {new Date(notice.createdAt).toLocaleString()}
          </div>
        </div>

        {/* 내용 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />

        {/* 첨부파일 */}
        {notice.attachmentList?.map((item) => (
          <AttachmentItem key={item.url} item={item} isEn={false} />
        ))}
      </div>
    </div>
  );
}
