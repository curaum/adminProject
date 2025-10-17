"use client";

import Image from "next/image";

interface CheckProps {
  value: boolean;
  disabled?: boolean;
  text?: string;
  onClick?: () => void;
}

export const Check = ({ value, disabled, text, onClick }: CheckProps) => {
  return (
    <>
      <label
        onClick={!disabled ? onClick : undefined}
        className="checkContainer"
      >
        <Image
          src={
            value
              ? "/images/icon_check_on.png"
              : "/images/checkbox_unselected.svg"
          }
          alt={value ? "Checked" : "Unchecked"}
          width={24}
          height={24}
        />
        {text && text}
      </label>
      <style jsx>
        {`
          .checkContainer {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 16px;
            color: #7c7c7c;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Check;
