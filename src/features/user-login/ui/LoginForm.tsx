"use client";

import { useState } from "react";
import { useLogin } from "../model/useLogin";
import Image from "next/image";
import styles from "./LoginForm.module.css";
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
      <label className={styles.login_persist}>
        <Image
          src={
            isSaveId
              ? "/images/icon_check_on.png"
              : "/images/checkbox_unselected.svg"
          }
          alt={isSaveId ? "Checked" : "Unchecked"}
          width={24}
          height={24}
        />
        로그인 상태 유지하기
      </label>
      <button type="submit" className={styles.submit_button}>
        로그인
      </button>
    </form>
  );
};
