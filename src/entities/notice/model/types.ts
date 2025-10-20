// entities/notice/model/types.ts

export interface NoticeItem {
  pid: number;
  title: string;
  type: "IMPORTANT" | "NORMAL";
  createdAt: string; // ISO 날짜 문자열
  modifiedAt: string; // ISO 날짜 문자열
  createdBy: number;
  modifiedBy: number;
}
export interface NoticeListResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: NoticeItem[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  numberOfElements: number;
  last: boolean;
  first: boolean;
  empty: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

export interface NoticeDetailResponse extends NoticeItem {
  imageList: File[];
  attachmentList: File[];
  content: string;
  accessTargetList: string[];
}

export interface AddNoticeRequest {
  title: string;
  content: string;
  type: "IMPORTANT" | "NORMAL";
  accessTargetList: string[];
  imageFileDTOList?: string[];
  attachmentFileDTOList?: string[];
}
export interface UpdateNoticeRequest {
  pid: string | number;
  title: string;
  content: string;
  type: "IMPORTANT" | "NORMAL";
  accessTargetList: string[];
  imageFileDTOList?: FileDTO[];
  attachmentFileDTOList?: FileDTO[];
}

export interface AddNoticeResponse {
  success: boolean;
  pid: number;
}

export interface UploadFileRequest {
  domainPurpose: string;
  fileData: File;
}

export interface UploadFileResponse {
  filePid: number;
  realName: string;
  url: string;
}
export interface FileDTO {
  realName: string;
  virtualName: string;
  contentType: string;
  fileSize: number;
}
export interface File {
  filePid: number;
  realName: string;
  virtualName: string;
  contentType: string;
  category: string;
  fileSize: number;
  url: string;
}
