"use client";

import { useState } from "react";
import { useLogin } from "../model/useLogin";
import Image from "next/image";
import styles from "./LoginForm.module.css";
import Button from "@/shared/ui/Button";
import Check from "@/shared/ui/Check";
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>로그인</p>
      <div className={styles.login}>
        <p>아이디</p>
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={styles.login_input}
        />
      </div>
      <div className={styles.password}>
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className={styles.password_input}
        />
      </div>
      <Check
        value={isSaveId}
        text="로그인 상태 유지하기"
        onClick={() => setIsSaveId((prev) => !prev)}
      />
      <Button text="로그인" type="submit" disabled={!id || !pw} />
    </form>
  );
};
