import { apiClient } from "@/shared/api";
import axios from "axios";
import { LoginParams } from "../model/types";
import AES256 from "@/shared/lib/aes256";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginApi = {
  login: async ({ id, pw, os }: LoginParams) => {
    return axios.post(
      `${BASE_URL}api/admin/user/login`,
      { id: id, pw: AES256.encrypt(String(pw)), os: os },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  },
};
