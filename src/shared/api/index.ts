import axios from "axios";

const BASE_URL = "http://119.192.215.129:503/";
export const apiClient = axios.create({
  timeout: 30000,
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  // paramsSerializer: (params) => {
  //   return qs.stringify(params, { arrayFormat: "brackets" });
  // },
});
