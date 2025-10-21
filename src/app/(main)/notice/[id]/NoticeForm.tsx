"use client";

import {
  NoticeDetailResponse,
  UpdateNoticeRequest,
} from "@/entities/notice/model/types";
import { useState, useEffect } from "react";
import styles from "./NoticeDetailPage.module.css";
import Image from "next/image";
import AttachmentItem from "@/shared/ui/AttachmentItem";
import Tiptap from "@/features/create-notice/ui/TipTap";
import BottomNavBar from "@/shared/ui/BottomNavBar";
import { useUpdateNotice } from "@/entities/notice/model/useUpdateNotice";
import Check from "@/shared/ui/Check";
export default function NoticeForm({
  notice,
}: {
  notice: NoticeDetailResponse;
}) {
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);
  const [type, setType] = useState(notice.type);
  const [imageList, setImageList] = useState(
    notice.imageList.map((item) => ({
      realName: item.realName,
      virtualName: item.virtualName,
      contentType: item.contentType,
      fileSize: item.fileSize,
    }))
  );
  const [attachmentList, setAttachmentList] = useState(
    notice.attachmentList.map((item) => ({
      realName: item.realName,
      virtualName: item.virtualName,
      contentType: item.contentType,
      fileSize: item.fileSize,
    }))
  );
  const [accessTargetList, setAccessTargetList] = useState(
    new Set(notice.accessTargetList)
  );
  const parseAccessTargets = (serverList: Set<string>) => {
    const hasKO = serverList.has("PARTNER_KO");
    const hasEN = serverList.has("PARTNER_EN");

    return [
      {
        key: "FACTORY",
        label: "기공소",
        value: serverList.has("FACTORY"),
      },
      { key: "PARTNER", label: "파트너", value: hasKO && hasEN }, // 둘 다 있어야 true
      { key: "PARTNER_KO", label: "국내", value: hasKO },
      { key: "PARTNER_EN", label: "해외", value: hasEN },
    ];
  };

  const handleChangeAccessTargetValue = (key: string, value: boolean) => {
    setAccessTargetList((prev) => {
      const next = new Set(prev);

      if (value) {
        // 체크 해제
        if (key === "PARTNER") {
          next.delete("PARTNER_KO");
          next.delete("PARTNER_EN");
        } else {
          next.delete(key);
        }
      } else {
        // 체크
        if (key === "PARTNER") {
          next.add("PARTNER_KO");
          next.add("PARTNER_EN");
        } else {
          next.add(key);
        }
      }

      return next;
    });
  };

  const { fetchUpdateNotice, success } = useUpdateNotice();

  const handleSave = (notice: NoticeDetailResponse) => {
    const body = {
      pid: notice.pid,
      title,
      content,
      type,
      accessTargetList: Array.from(accessTargetList),
      imageFileDTOList: imageList,
      attachmentFileDTOList: attachmentList,
    };
    fetchUpdateNotice(body);
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
        {/* 공지 대상 */}
        <div className={styles.cardRow}>
          <div className={styles.label}>공지 대상</div>
          <div className={styles.accessTargetList}>
            {parseAccessTargets(accessTargetList).map((target) => (
              <div
                key={target.key}
                className={
                  target.key === "FACTORY" ? styles["factoryTarget"] : ""
                }
                style={{ marginLeft: target.key === "PARTNER" ? "8px" : 0 }}
              >
                <Check
                  value={target.value}
                  text={target.label}
                  onChangeValue={() =>
                    handleChangeAccessTargetValue(target.key, target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* 내용 */}
        <div className={styles.textarea}>
          <Tiptap content={content} onChange={(val) => setContent(val)} />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />

        {/* 첨부파일 */}
        {notice.attachmentList?.map((item) => (
          <AttachmentItem key={item.url} item={item} />
        ))}
      </div>
      <BottomNavBar
        buttons={[
          {
            id: "create",
            label: "공지 등록",
            onClick: () => handleSave(notice),
            activeStyle: { backgroundColor: "#51c37e", color: "#fff" },
            inactiveStyle: { backgroundColor: "#F5F7F7", color: "#7c7c7c" },
          },
        ]}
      />
    </div>
  );
}
