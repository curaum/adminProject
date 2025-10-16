"use client";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { setCookie } from "../lib/cookies";
import { apiClient } from "./index";
import { redirect } from "next/navigation";

let alertShown = false;
export function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  console.log("쿠키 없음:", name);
  return null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 요청 인터셉터

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getCookie("accessToken");
    const memoryToken = getCookie("memoryToken");
    console.log("요청 accessToken:", accessToken, memoryToken);

    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    } else if (memoryToken) {
      config.headers.Authorization = "Bearer " + memoryToken;
    }
    console.log("요청 헤더:", config.headers);
    return config;
  },
  function (error: AxiosError): Promise<AxiosError> {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const accessToken = getCookie("accessToken");
    console.log("응답 accessToken:", accessToken);
    if (accessToken) {
      setCookie("memoryToken", accessToken);
    }

    return response;
  },
  async function (error: AxiosError): Promise<AxiosError> {
    const response = error.response as AxiosResponse<any> | undefined;

    if (response?.data?.status === 403) {
      const result = await accessTokenRefresh();
      if (result.status === 200) {
        const newToken = getCookie("accessToken");
        if (newToken) {
          error.config.headers.Authorization = "Bearer " + newToken;
          return apiClient(error.config);
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
export async function accessTokenRefresh() {
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
        setCookie("memoryToken", accessToken); // memoryToken 업데이
      }
    }

    return response;
  } catch (err) {
    if (!alertShown) {
      alertShown = true; // alert 표시한 것으로 설정
      if (err.response?.data?.status === 109) {
        alert("중복 로그인: 로그인 페이지로 이동합니다.");
      } else {
        alert("토큰 만료: 로그인 페이지로 이동합니다.");
      }
      redirect("/login");
    }

    throw err; // 에러를 다시 throw하여 호출 측에서 처리할 수 있도록 전달
  }
}
