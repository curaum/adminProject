"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useNoticeList } from "@/entities/notice/model/useNoticeList";
import Pagination from "@/shared/ui/Pagination";
import { formatDateAndTime } from "@/shared/utils/dateUtil";
import styles from "./NoticeListPage.module.css";
import { useToast } from "@/shared/utils/ToastContext";
import BottomNavBar from "@/shared/ui/BottomNavBar";
export default function NoticeListPage() {
  const router = useRouter();
  const {
    notices,
    totalPages,
    totalElements,
    loading,
    error,
    fetchNoticeList,
  } = useNoticeList();
  const { showToast } = useToast();
  const [page, setPage] = useState(0);
  const pageSize = 20;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchNoticeList(newPage, pageSize);
    // 실제로는 여기서 서버에 요청 보내거나 데이터를 다시 불러옴
  };
  const navigateToNoticeCreatePage = () => {
    router.push("/notice/new");
  };

  const openNoticePage = (pid: number, mode: string) => {
    const params = new URLSearchParams();

    if (mode === "edit") {
      params.append("mode", "edit");
    }

    const queryString = params.toString();
    const url = queryString
      ? `/notice/${pid}?${queryString}`
      : `/notice/${pid}`;
    window.open(url, "_blank");
  };
  // 페이지가 마운트될 때 공지사항 리스트 호출
  useEffect(() => {
    fetchNoticeList(0, pageSize); // page=0, size=10
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div className={styles.container}>
      {/* <button onClick={() => showToast("작업이 완료되었습니다!")}>
        토스트 띄우기
      </button> */}
      <div className={styles.headerRow}>
        <div className={styles.headerBox}>
          <div className={styles.titleHeader}>제목</div>
          <div className={styles.dateHeader}>작성일시</div>
        </div>
        <Pagination
          total={totalElements}
          pageSize={pageSize}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>

      <div className={styles.noticeList}>
        {notices.map((notice) => (
          <div key={notice.pid} className={styles.noticeRow}>
            <div className={styles.noticeTitleBox}>
              {notice.type === "IMPORTANT" && (
                <div className={styles.importantBadge}>중요</div>
              )}
              <div>{notice.title}</div>
            </div>
            <div className={styles.noticeDate}>
              {formatDateAndTime(notice.createdAt, false)}
            </div>
            <div className={styles.detailButton}>
              <Image
                src="/images/btn_detail.svg"
                alt="상세보기"
                width={20}
                height={20}
                onClick={() => openNoticePage(notice.pid, "detail")}
              />
            </div>
            <div className={styles.detailButton}>
              <Image
                src="/images/icon_modifyview.svg"
                alt="수정"
                width={24}
                height={24}
                onClick={() => openNoticePage(notice.pid, "edit")}
              />
            </div>
          </div>
        ))}
      </div>
      <BottomNavBar
        buttons={[
          {
            id: "create",
            label: "공지 작성",
            onClick: () => navigateToNoticeCreatePage(),
            activeStyle: { borderColor: "#51c37e", color: "#51c37e" },
          },
        ]}
      />
    </div>
  );
}
