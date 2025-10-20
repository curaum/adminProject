import { useState } from "react";
import { deleteNotice } from "../api/deleteNotice";
import { useRouter } from "next/navigation";
export function useNoticeDelete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const handleDeleteNotice = async (pid: number) => {
    const ok = confirm(
      "삭제 시 모든 사용자에게 영구적으로 삭제되며 복구할 수 없습니다. 삭제하시겠습니까?"
    );
    if (!ok) return;
    setLoading(true);
    setError(null);
    try {
      const response = await deleteNotice(pid);
      console.log("response", response);
      if (response.status === 200) {
        router.push("/notice");
      }
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteNotice, loading, error };
}
