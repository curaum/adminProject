import { LoginForm } from "@/features/user-login/ui/LoginForm";
import "@/shared/api/interceptors";
import styles from "./login.module.css";
import Image from "next/image";
import LoginImageSlider from "@/features/user-login/ui/LoginImageSlider";
export default function LoginPage() {
  const images = ["Onboarding_1p", "Onboarding_2p", "Onboarding_3p"];
  return (
    <div className={styles.container}>
      <div className={styles.login_left}>
        <LoginImageSlider images={images} />
      </div>
      <div className={styles.login_right}>
        <Image
          src="/images/dentrion_logo.svg"
          alt="Dentrion Logo"
          width={120}
          height={24}
          className={styles.logo}
        />
        <LoginForm />
      </div>
    </div>
  );
}
