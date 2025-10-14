"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
// import "@/styles/leftNav.css"; // CSS는 아래 스타일을 별도 파일로 분리
import "./SideNavBar.css";

import Link from "next/link";

export default function SideNavBar() {
  const pathname = usePathname();

  const dashboard = [{ title: "공지사항", url: "/notice" }];

  const getFocusClass = (url: string) =>
    pathname === url || pathname.startsWith(url + "/") ? "focus" : "none_focus";
  return (
    <div className="nav_wrapper">
      <div className="nav_container">
        <Link href={dashboard[0].url}>
          <Image
            src="/images/dentrion_logo.svg"
            alt="Dentrion Logo"
            className="logo cursor-pointer"
            width={120}
            height={24}
          />
        </Link>

        <div className="text_area">
          <Link href={dashboard[0].url} className="nav_content">
            <p className={getFocusClass(dashboard[0].url)}>
              {dashboard[0].title}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
