"use client";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { setCookie, getCookie } from "../lib/cookies";
interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
interface ErrorData {
  message: string; // 사용자에게 보여줄 메시지
  [key: string]: string | number; // 기타 데이터 허용
}
let alertShown = false;

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 요청 인터셉터
export function setInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken = getCookie("accessToken") || getCookie("memoryToken");

      if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (error: AxiosError): Promise<AxiosError> {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  apiClient.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    async function (
      error: AxiosError
    ): Promise<AxiosResponse<ErrorData> | AxiosError> {
      const response = error.response as AxiosResponse<ErrorData> | undefined;
      if (response?.status === 401 || response?.status === 403) {
        const result = await accessTokenRefresh();
        if (result.status === 200) {
          const newToken = getCookie("accessToken");
          if (newToken) {
            if (error.config?.headers) {
              error.config.headers.Authorization = "Bearer " + newToken;
              return apiClient(error.config);
            } else {
              // config가 없으면 그냥 에러를 다시 reject
              return Promise.reject(error);
            }
          }
        }
      } else if (response?.data) {
        if (!alertShown) {
          alertShown = true;
          const { code, message } = response.data;

          if (
            code === "CANNOT_DELETE_MAPPING_TEMP" ||
            code === "DUPLICATE_NICKNAME"
          ) {
            console.warn(message);
          } else {
            alert(message);
          }
        }

        return response;
      }

      return Promise.reject(error);
    }
  );
}
export async function accessTokenRefresh() {
  console.log("accessTokenRefresh");
  try {
    const token = getCookie("accessToken") || getCookie("memoryToken"); // accessToken이 없으면 memoryToken 사용

    const response = await axios.post(
      `${BASE_URL}api/admin/user/token/refresh`,
      {}, // 요청 body가 필요하지 않다면 빈 객체 전달
      {
        withCredentials: true, // 쿠키 포함 설정
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`, // accessToken을 헤더에 추가
        },
      }
    );

    if (response.status === 200) {
      // header로 token 받아올 경우
      const authorizationHeader = response.headers["authorization"];
      if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const accessToken = authorizationHeader.slice(7); // 토큰 추출
        const isKeepingLogIn = localStorage.getItem("keepingLogin") === "true"; // localStorage에서 값 확인
        const expirationDays = isKeepingLogIn ? 7 : 1 / 48; // 7일 또는 30분 (1/48일)
        setCookie("accessToken", accessToken, expirationDays); // 쿠키에 저장
        setCookie("memoryToken", accessToken); // memoryToken 업데이트
      }
    }

    return response;
  } catch (err) {
    if (!alertShown) {
      alertShown = true; // alert 표시한 것으로 설정
      // err가 객체인지 확인
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as AxiosError<{ status?: number }>;

        if (axiosErr.response?.data?.status === 109) {
          alert("중복 로그인: 로그인 페이지로 이동합니다.");
        } else {
          alert("토큰 만료: 로그인 페이지로 이동합니다.");
        }
      } else {
        alert("알 수 없는 오류: 로그인 페이지로 이동합니다.");
      }
      window.location.href = "/login";
    }

    throw err; // 에러를 다시 throw하여 호출 측에서 처리할 수 있도록 전달
  }
}
