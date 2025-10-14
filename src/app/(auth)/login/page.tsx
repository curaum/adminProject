import { LoginForm } from "@/features/user-login/ui/LoginForm";
import "@/shared/api/interceptors";
import styles from "./login.module.css";
export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.login_left}></div>
      <div className={styles.login_right}>
        <LoginForm />
      </div>
    </div>
  );
}
