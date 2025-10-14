import { apiClient } from "@/shared/api";
import axios from "axios";
import { LoginParams } from "../model/types";
import AES256 from "@/shared/lib/aes256";

export const loginApi = {
  login: async ({ id, pw, os }: LoginParams) => {
    return axios.post(
      "https://119.192.215.129:403/api/user/login",
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
