export interface UserInfoResponse {
  userPid: number;
  id: string;
  rolePid: number;
  userName: string;
  companyName: string;
  companyPid: number;
}

export interface Company {
  companyPid: number;
  companyName: string;
  companyType: "FACTORY" | "PARTNER"; // 서버에서 올 수 있는 값 명확히 알면 고정
  isDentrion: 0 | 1;
  telNumber: string;
  faxNumber: string;
  address: string;
  businessNumber: string;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerEmail: string;
  startDate: string; // "YYYY-MM-DD"
  createDate: string; // ISO datetime
  updateDate: string; // ISO datetime
  locale: "ko_KR" | "en_US";
  currency: string;
  symbol: string;
  businessFile: BusinessFile | null;
}

export interface BusinessFile {
  filePid: number;
  realName: string;
  virtualName: string;
  contentType: string;
  category: string;
  fileSize: number;
  url: string;
}
