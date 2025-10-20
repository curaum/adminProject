"use client";

import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import {
  updateNotice,
  UpdateNoticeRequest,
} from "@/entities/notice/api/updateNotice";

export function useUpdateNotice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [success, setSuccess] = useState(false);

  const fetchUpdateNotice = useCallback(async (data: UpdateNoticeRequest) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log("fetchUpdateNotice request body", data);
    try {
      await updateNotice(data);
      setSuccess(true);
    } catch (err) {
      setError(err as AxiosError);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchUpdateNotice,
    loading,
    error,
    success,
  };
}
