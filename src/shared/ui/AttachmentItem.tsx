"use client";

import Image from "next/image";
import styles from "./AttachmentItem.module.css";
import { FileDTO, File } from "@/entities/notice/model/types";

interface AttachmentItemProps {
  item: File | FileDTO;
  isEditable: boolean;
  onDelete?: () => void;
}

export default function AttachmentItem({
  item,
  isEditable,
  onDelete,
}: AttachmentItemProps) {
  const onDownload = async () => {
    const blob = await fetch(item.url).then((r) => r.blob());
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.setAttribute("download", item.realName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onViewFile = () => {
    const ext = item.realName.split(".").pop()?.toLowerCase();
    if (ext === "stl") {
      window.open(
        `/three-viewer?name=${item.realName}&url=${encodeURIComponent(
          item.url
        )}`,
        "_blank"
      );
    } else if (
      ["png", "jpg", "jpeg", "gif", "pdf", "html"].includes(ext || "")
    ) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <div className={styles.filesContainer}>
      <div className={styles.fileContentBox}>
        <div className={styles.fileInfoBox}>
          <p className={styles.fileName}>
            {item.realName.substring(0, item.realName.lastIndexOf("."))}
          </p>
          <p className={styles.fileType}>
            {item.realName.substring(item.realName.lastIndexOf("."))}
          </p>
          <p className={styles.fileSizeText}>
            {Math.round(item.fileSize / 1024)} KB
          </p>
        </div>

        <div className={styles.iconBox}>
          {isEditable ? (
            // 편집 가능할 때: 삭제 아이콘만 보여주기
            <button onClick={onDelete}>
              <Image
                src="/images/icon_delete.svg"
                alt="삭제"
                width={24}
                height={24}
                className={styles.cursor}
              />
            </button>
          ) : (
            // 편집 불가: 기존 보기 / 다운로드 아이콘
            <>
              {item.realName &&
                [".png", ".jpg", ".jpeg", ".gif", ".pdf", ".html", ".stl"].some(
                  (ext) => item.realName.toLowerCase().endsWith(ext)
                ) && (
                  <Image
                    src={
                      item.realName.toLowerCase().endsWith(".stl")
                        ? "/images/svg_openEye.svg"
                        : "/images/btn_detail.svg"
                    }
                    alt="파일 보기"
                    width={
                      item.realName.toLowerCase().endsWith(".stl") ? 24 : 20
                    }
                    height={24}
                    className={styles.cursor}
                    style={{ marginRight: 10 }}
                    onClick={onViewFile}
                  />
                )}

              <Image
                src="/images/icon_download.svg"
                alt="다운로드"
                width={24}
                height={24}
                className={styles.cursor}
                onClick={onDownload}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
