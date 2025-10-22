"use client";

import {
  NoticeDetailResponse,
  UpdateNoticeRequest,
} from "@/entities/notice/model/types";
import { useState, useEffect } from "react";
import styles from "./NoticeDetailPage.module.css";
import Image from "next/image";
import Tiptap from "@/features/create-notice/ui/TipTap";
import BottomNavBar from "@/shared/ui/BottomNavBar";
import { useUpdateNotice } from "@/entities/notice/model/useUpdateNotice";
import Check from "@/shared/ui/Check";
import ToggleButton from "@/shared/ui/ToggleButton";
import AttachmentUploader from "@/shared/ui/AttachmentUploader";
import { uploadFile } from "@/shared/api/uploadFile";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/utils/ToastContext";
export default function NoticeForm({
  notice,
}: {
  notice: NoticeDetailResponse;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);
  const [type, setType] = useState(notice.type);
  const [imageList, setImageList] = useState(notice.imageList);
  const [attachmentList, setAttachmentList] = useState(notice.attachmentList);
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
  const handleAddFile = async (file: File) => {
    const response = await uploadFile({
      file,
      domainPurpose: "NOTICE_ATTACHMENT",
    });
    if (response.status === 200) {
      const newFile = response.data;
      setAttachmentList((prev) => [...prev, newFile]);
    }
  };
  const handleDeleteFile = (idx: number) => {
    setAttachmentList((prev) => prev.filter((_, i) => i !== idx));
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

  const handleSave = async (notice: UpdateNoticeRequest) => {
    const body = {
      pid: notice.pid,
      title,
      content,
      type,
      accessTargetList: Array.from(accessTargetList),
      imageFileDTOList: imageList.map((item) => ({
        realName: item.realName,
        virtualName: item.virtualName,
        contentType: item.contentType,
        fileSize: item.fileSize,
      })),
      attachmentFileDTOList: attachmentList.map((item) => ({
        realName: item.realName,
        virtualName: item.virtualName,
        contentType: item.contentType,
        fileSize: item.fileSize,
      })),
    };
    const result = await fetchUpdateNotice(body);
    if (result) {
      showToast("공지 등록이 완료되었습니다.");
      router.push(`/notice/${notice.pid}`);
    }
  };

  return (
    <div className={styles.lightgrayText}>
      <div className={styles.container}>
        {/* 제목 */}
        <div className={styles.cardRow}>
          <div className={styles.label}>중요</div>
          <div className={styles.titleTextContainer}>
            <div className={styles.importantImage}>
              <ToggleButton
                value={type === "IMPORTANT"}
                onClick={() =>
                  setType((prev) => {
                    if (prev === "IMPORTANT") {
                      return "NORMAL";
                    } else {
                      return "IMPORTANT";
                    }
                  })
                }
              />
            </div>
            <div className={styles.label}>제목</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`${styles.titleInput} ${styles.titleText}`}
            />
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

        {/* 첨부파일 */}
        <AttachmentUploader
          files={attachmentList}
          mode="edit"
          onAddFile={handleAddFile}
          onDelete={handleDeleteFile}
        />
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
