"use client";

import { useState } from "react";
import { useLogin } from "../model/useLogin";

export const LoginForm = () => {
  const { login } = useLogin();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isSaveId, setIsSaveId] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(id, pw, isSaveId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="border p-2 rounded"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isSaveId}
          onChange={(e) => setIsSaveId(e.target.checked)}
        />
        로그인 상태 유지
      </label>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        로그인
      </button>
    </form>
  );
};
