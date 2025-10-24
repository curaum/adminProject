"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useNoticeList } from "@/entities/notice/model/useNoticeList";
import Pagination from "@/shared/ui/Pagination";
import { formatDateAndTime } from "@/shared/utils/dateUtil";
import styles from "./NoticeListPage.module.css";
import { useToast } from "@/shared/utils/ToastContext";
import BottomNavBar from "@/shared/ui/BottomNavBar";
import DropdownSelect from "@/shared/ui/DropdownSelect";
import debounce from "lodash.debounce";
const ACCESSTARGET_OPTIONS = [
  { label: "전체", value: "" },
  { label: "기공소", value: "FACTORY" },
  { label: "국내 파트너", value: "PARTNER_KO" },
  { label: "해외 파트너", value: "PARTNER_EN" },
];
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
  const [accessTarget, setAccessTarget] = useState(ACCESSTARGET_OPTIONS[0]);
  const [showAccessTarget, setShowAccessTarget] = useState(false);
  const [title, setTitle] = useState("");
  const pageSize = 10;

  const debouncedFetch = useCallback(
    debounce((value) => {
      fetchNoticeList(page, pageSize, accessTarget.value, value);
    }, 300),
    []
  );
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    debouncedFetch(value);
  };
  const handleTitleReset = () => {
    setTitle("");
    debouncedFetch("");
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchNoticeList(newPage, pageSize, accessTarget.value, title);
    // 실제로는 여기서 서버에 요청 보내거나 데이터를 다시 불러옴
  };
  const handleAccessTargetChange = (target) => {
    setAccessTarget(target);
    setShowAccessTarget((prev) => !prev);
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
    fetchNoticeList(0, pageSize, accessTarget.value, title); // page=0, size=10
  }, [accessTarget]);

  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div className={styles.container}>
      {/* <button onClick={() => showToast("작업이 완료되었습니다!")}>
        토스트 띄우기
      </button> */}
      <div className={styles.filterContainer}>
        <div className={styles.filterBox}>
          <div className={styles.accessTarget_box}>
            <div>공지 대상</div>
            <DropdownSelect
              value={accessTarget}
              options={ACCESSTARGET_OPTIONS}
              onChange={handleAccessTargetChange}
            />
          </div>
          <div className={styles.accessTarget_box}>
            <div>제목</div>
            <div className={styles.accessTarget_container}>
              <div className={styles.title_inputBox}>
                <Image
                  src={"/images/icon_search.svg"}
                  alt="search"
                  width={24}
                  height={24}
                />
                <input
                  className={styles.title_input}
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="공지 제목을 검색해주세요."
                />
                {title !== "" && (
                  <button onClick={handleTitleReset}>
                    <Image
                      src={"/images/icon_del.svg"}
                      alt="delete"
                      width={24}
                      height={24}
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Pagination
          total={totalElements}
          pageSize={pageSize}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
      <div className={styles.headerRow}>
        <div className={styles.headerBox}>
          <div className={styles.titleHeader}>제목</div>
          <div className={styles.dateHeader}>작성일시</div>
        </div>
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
            onClick: navigateToNoticeCreatePage,
            activeStyle: { borderColor: "#51c37e", color: "#51c37e" },
          },
        ]}
      />
    </div>
  );
}
