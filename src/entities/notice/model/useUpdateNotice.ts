"use client";

import { useState, useCallback } from "react";
import { AxiosError } from "axios";
import { updateNotice } from "@/entities/notice/api/updateNotice";
import { UpdateNoticeRequest } from "./types";
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
    fetchUpdateNotice,
    loading,
    error,
    success,
  };
}
