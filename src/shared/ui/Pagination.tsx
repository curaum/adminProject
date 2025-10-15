"use client";

import Image from "next/image";
import styles from "./Pagination.module.css";
import { useMemo } from "react";

interface PaginationProps {
  total: number; // 총 항목 수
  pageSize: number; // 페이지당 항목 수
  page: number; // 현재 페이지 (0부터 시작)
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  total,
  pageSize,
  page,
  onPageChange,
}: PaginationProps) {
  const groupSize = 10;

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  );
  const currentPage = page;
  const totalGroups = Math.ceil(totalPages / groupSize);
  const currentGroup = Math.ceil((currentPage + 1) / groupSize);

  // useMemo를 이용해 currentPage, totalPages가 변경될 때마다 재계산
  const visiblePages = useMemo(() => {
    const firstPage = Math.floor(currentPage / 10) * 10 + 1;
    const lastPage = Math.min(totalPages, firstPage + 9);
    return Array.from(
      { length: lastPage - firstPage + 1 },
      (_, i) => firstPage + i
    );
  }, [currentPage, totalPages]);

  const changePage = (offset: number) => {
    const nextPageGroupFirstPage =
      Math.floor(currentPage / 10) * 10 + offset * 10;
    if (nextPageGroupFirstPage >= 0 && nextPageGroupFirstPage < totalPages) {
      onPageChange(
        offset > 0 ? nextPageGroupFirstPage : nextPageGroupFirstPage + 9
      );
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  if (total === 0) return null;

  return (
    <div className={styles.wrapper}>
      {/* 왼쪽 버튼 */}
      <div
        className={`${currentPage === 0 ? styles.notAllowed : styles.cursor}`}
        onClick={() => changePage(-1)}
      >
        {totalPages > 10 && currentGroup > 1 && (
          <Image
            src="/images/button_pagination_left.svg"
            alt="이전"
            width={24}
            height={24}
          />
        )}
      </div>

      {/* 페이지 번호 */}
      <div className={styles.pageContainer}>
        {visiblePages.map((pageNumber) => (
          <div
            key={pageNumber}
            className={`${styles.pageNumber} ${
              pageNumber === currentPage + 1 ? styles.currentPage : ""
            }`}
            onClick={() => goToPage(pageNumber - 1)}
          >
            <p>{pageNumber}</p>
          </div>
        ))}
      </div>

      {/* 오른쪽 버튼 */}
      <div
        className={`${
          currentPage === totalPages - 1 ? styles.notAllowed : styles.cursor
        }`}
        onClick={() => changePage(1)}
      >
        {totalPages > 10 && currentGroup < totalGroups && (
          <Image
            src="/images/button_pagination_right.svg"
            alt="다음"
            width={24}
            height={24}
          />
        )}
      </div>
    </div>
  );
}
