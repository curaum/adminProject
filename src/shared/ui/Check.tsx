"use client";

import Image from "next/image";

interface CheckProps {
  value: boolean;
  disabled?: boolean;
  text?: string;
  onChangeValue?: () => void;
}

export const Check = ({ value, disabled, text, onChangeValue }: CheckProps) => {
  return (
    <>
      <label
        onClick={!disabled ? onChangeValue : undefined}
        className="checkContainer"
      >
        <Image
          src={
            value
              ? "/images/checkbox_selected.svg"
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
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default Check;
