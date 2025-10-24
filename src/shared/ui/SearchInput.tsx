"use client";

import Image from "next/image";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: () => void;
}

export default function SearchInput({
  value,
  placeholder = "입력해주세요.",
  onChange,
  onReset,
}: SearchInputProps) {
  return (
    <>
      <div className="inputBox">
        <Image
          src={"/images/icon_search.svg"}
          alt="search"
          width={24}
          height={24}
        />
        <input
          className="input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {value !== "" && onReset && (
          <button onClick={onReset}>
            <Image
              src={"/images/icon_del.svg"}
              alt="delete"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      <style jsx>
        {`
          .inputBox {
            display: flex;
            gap: 8px;
            width: 400px;
            height: 38px;
            border-radius: 4px;
            border: 1px solid #e5e5e5;
            padding: 0 8px;
            font-size: 16px;
            color: black;
          }
          .input {
            flex: 1;
          }
          .input:focus {
            border: none;
            outline: none;
          }
        `}
      </style>
    </>
  );
}
