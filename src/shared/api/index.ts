import axios from "axios";
import { setInterceptors } from "./interceptors";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const apiClient = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
setInterceptors(apiClient);
