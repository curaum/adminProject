"use client";

import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { createNotice } from "@/features/create-notice/api/createNotice";
import { CreateNoticeRequest } from "../../../entities/notice/model/types";
export function useCreateNotice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchCreateNotice = useCallback(async (data: CreateNoticeRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log("fetchCreateNotice request body", data);
    try {
      await createNotice(data);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err as AxiosError);
      setSuccess(false);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchCreateNotice,
    loading,
    error,
    success,
  };
}
