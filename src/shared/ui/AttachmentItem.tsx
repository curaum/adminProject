"use client";

import Image from "next/image";
import styles from "./AttachmentItem.module.css";

interface AttachmentItemProps {
  item: {
    url: string;
    realName: string;
    fileSize: number;
  };
  isEn?: boolean;
}

export default function AttachmentItem({ item, isEn }: AttachmentItemProps) {
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
                width={item.realName.toLowerCase().endsWith(".stl") ? 24 : 20} // 필요에 따라 width 조정
                height={24} // 높이 고정
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
        </div>
      </div>
    </div>
  );
}
