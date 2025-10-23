"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useUserStore } from "@/entities/user/model/userStore";
import styles from "./MyProfile.module.css";
import BottomNavBar from "@/shared/ui/BottomNavBar";
export default function MyProfilePage() {
  const userInfo = useUserStore((state) => state.userInfo);
  return (
    <main>
      <div className={styles.profileRow}>
        <div className={styles.nameCard}>성함</div>
        <div>{userInfo?.userName}</div>
      </div>
      <BottomNavBar
        buttons={[
          {
            id: "create",
            label: "공지 등록",
            onClick: () => handleSave(notice),
            activeStyle: { backgroundColor: "#51c37e", color: "#fff" },
            inactiveStyle: { backgroundColor: "#F5F7F7", color: "#7c7c7c" },
          },
        ]}
      />
    </main>
  );
}
