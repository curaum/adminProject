"use client";

import { useState, useEffect } from "react";
import { useLogin } from "../model/useLogin";
import styles from "./LoginForm.module.css";
import Button from "@/shared/ui/Button";
import Check from "@/shared/ui/Check";
export const LoginForm = () => {
  const { login } = useLogin();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaveId, setIsSaveId] = useState(false);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(id, pw, isSaveId);
    console.log("result", result);
    if (!result) {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [id, pw]);
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.title}>로그인</p>
      <div>
        <div className={styles.login}>
          <p>아이디</p>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={handleIdChange}
            className={styles.login_input}
            style={{
              border: errorMessage ? "1px solid #fc5b54" : "1px solid #e5e5e5",
            }}
          />
        </div>
      </div>
      <div>
        <div className={styles.password}>
          <p>비밀번호</p>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            onChange={handlePasswordChange}
            className={styles.password_input}
            style={{
              border: errorMessage ? "1px solid #fc5b54" : "1px solid #e5e5e5",
            }}
          />
        </div>
        <div className={styles.error_message}>{errorMessage}</div>
      </div>

      <div style={{ color: "#7c7c7c" }}>
        <Check
          value={isSaveId}
          text="로그인 상태 유지하기"
          onChangeValue={() => setIsSaveId((prev) => !prev)}
        />
      </div>
      <Button
        text="로그인"
        type="submit"
        disabled={!id || !pw || !!errorMessage}
        activeStyle={{
          backgroundColor: "#51c37e",
          color: "#fff",
        }}
        inactiveStyle={{
          backgroundColor: "#f5f7f7",
          color: "#7c7c7c",
        }}
      />
    </form>
  );
};
