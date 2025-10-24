"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useUserStore } from "@/entities/user/model/userStore";
import styles from "./MyProfile.module.css";
import BottomNavBar from "@/shared/ui/BottomNavBar";
import { useLogout } from "@/entities/user/model/useLogout";
export default function MyProfilePage() {
  const userInfo = useUserStore((state) => state.userInfo);
  const { logout } = useLogout();
  return (
    <main>
      <div className={styles.profileRow}>
        <div className={styles.nameCard}>성함</div>
        <div>{userInfo?.userName}</div>
      </div>
      <BottomNavBar
        buttons={[
          {
            id: "logout",
            label: "로그아웃",
            onClick: logout,
            activeStyle: { borderColor: "#FE665C", color: "#FE665C" },
          },
        ]}
      />
    </main>
  );
}
