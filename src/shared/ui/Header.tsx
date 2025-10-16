"use client";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/entities/user/model/userStore";
import styles from "./Header.module.css";

const Header = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  return (
    <div className={styles.header_layout}>
      <div className={styles.header_container}>
        <div className="flex items-center">
          <p className={styles.user_company_name}>
            {userInfo?.company.companyName}
          </p>
        </div>

        <Link href="/my-profile" className={styles.user_container}>
          <p className={styles.user_name}>{userInfo?.userName}</p>
          <p className={styles.user_text}>님</p>
          <Image
            src="/images/user_icon.svg"
            width={24}
            height={24}
            alt="user icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
