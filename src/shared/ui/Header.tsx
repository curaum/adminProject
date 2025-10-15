import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";
interface UserInfo {
  userName: string;
  company: {
    companyName: string;
    companyPid: number;
  };
}

interface HeaderProps {
  userInfo: UserInfo;
}

const Header = () => {
  return (
    <div className={styles.header_layout}>
      <div className={styles.header_container}>
        <div className="flex items-center">
          <p className={styles.user_company_name}>
            {/* {userInfo.company.companyName} */}순순기공소
          </p>
        </div>

        <Link href="/my-profile" className={styles.user_container}>
          <p className={styles.user_name}>{/* {userInfo.userName} */}김혁수</p>
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
