import { LoginForm } from "@/features/user-login/ui/LoginForm";
import "@/shared/api/interceptors";
import styles from "./login.module.css";
import LoginImageSlider from "@/features/user-login/ui/LoginImageSlider";
export default function LoginPage() {
  const images = ["Onboarding_1p", "Onboarding_2p", "Onboarding_3p"];
  return (
    <div className={styles.container}>
      <div className={styles.login_left}>
        <LoginImageSlider images={images} />
      </div>
      <div className={styles.login_right}>
        <LoginForm />
      </div>
    </div>
  );
}
