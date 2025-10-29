"use client";
import Button from "./Button";
import { useRouter } from "next/navigation";
interface NavButton {
  id: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  activeStyle?: ButtonStyle;
  inactiveStyle?: ButtonStyle;
}

type ButtonStyle = {
  borderColor?: string;
  color?: string;
  backgroundColor?: string;
};

interface BottomNavBarProps {
  buttons: NavButton[];
  className?: string;
}

export const BottomNavBar = ({
  buttons,
  className = "right",
}: BottomNavBarProps) => {
  const router = useRouter();

  return (
    <>
      <nav className={`bottomNavBar ${className}`}>
        {buttons.map((btn) => (
          <Button
            key={btn.id}
            onClick={btn.onClick}
            disabled={btn.disabled}
            text={btn.label}
            activeStyle={btn.activeStyle}
            inactiveStyle={btn.inactiveStyle}
            width="176px"
            height="40px"
          />
        ))}
      </nav>
      <style jsx>
        {`
          .bottomNavBar {
            display: flex;
            justify-content: space-around;
            align-items: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 72px;
            background: white;
            box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.08);
            padding: 8px 40px;
            gap: 16px;
          }
          .right {
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  );
};

export default BottomNavBar;
