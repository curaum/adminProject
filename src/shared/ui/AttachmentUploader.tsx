"use client";

import { useState, ChangeEvent, useRef } from "react";
import styles from "./AttachmentUploader.module.css";
import AttachmentItem from "./AttachmentItem";
import { FileDTO } from "@/entities/notice/model/types";
import "./AttachmentUploader.module.css";
interface AttachmentUploaderProps {
  files: FileDTO[] | File[]; // 현재 첨부된 파일 리스트
  mode?: "read" | "edit"; // 기본값 "edit"
  maxSizeMB?: number;
  onAddFile?: (files: File) => void; // 새로운 파일 추가 시 callback
  onDelete?: (idx: number) => void; // 새로운 파일 추가 시 callback
}

export default function AttachmentUploader({
  files,
  mode = "edit",
  maxSizeMB = 500,
  onAddFile,
  onDelete,
}: AttachmentUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      alert(`${selectedFile.name} 파일 용량이 ${maxSizeMB}MB를 초과합니다.`);
      return;
    }
    onAddFile?.(selectedFile);
  };

  const handleClickButton = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          첨부파일<span> (500MB 이내)</span>
        </div>
        <div>
          <button onClick={handleClickButton} className={styles.button}>
            내 PC
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className={styles.input}
          />
        </div>
      </div>
      <div>
        <ul className={styles.fileList}>
          {files.map((file, idx) => (
            <AttachmentItem
              key={idx}
              item={file}
              isEditable={mode === "edit"}
              onDelete={() => onDelete?.(idx)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
