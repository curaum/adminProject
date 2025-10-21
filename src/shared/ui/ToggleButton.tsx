"use client";
import Image from "next/image";

interface ToggleButtonProps {
  value: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
export const ToggleButton = ({
  value,
  disabled,
  onClick,
}: ToggleButtonProps) => {
  return (
    <>
      <button
        className="toggleButton"
        onClick={!disabled ? onClick : undefined}
      >
        <Image
          src={
            value ? "/images/switch_enable.svg" : "/images/switch_disable.svg"
          }
          alt={value ? "Checked" : "Unchecked"}
          width={52}
          height={32}
        />
      </button>
      <style jsx>{``}</style>
    </>
  );
};
export default ToggleButton;
