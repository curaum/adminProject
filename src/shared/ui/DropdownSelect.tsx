"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownSelectProps {
  value: DropdownOption;
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
}

export default function DropdownSelect({
  value,
  options,
  onChange,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <div className="container" ref={dropdownRef}>
        <button
          className="selected_button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{value.label}</span>
          <Image
            src={"/images/icon_toggle.svg"}
            alt="toggle"
            width={12}
            height={6}
          />
        </button>

        {open && (
          <div className="dropdown">
            {options.map((opt, index) => {
              const isFirst = index === 0;
              const isLast = index === options.length - 1;
              return (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  style={{
                    borderTopLeftRadius: isFirst ? 4 : 0,
                    borderTopRightRadius: isFirst ? 4 : 0,
                    borderBottomLeftRadius: isLast ? 4 : 0,
                    borderBottomRightRadius: isLast ? 4 : 0,
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <style jsx>
        {`
          .container {
            position: relative;
            font-size: 16px;
            color: #000;
          }
          .selected_button {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 6px 0 10px;
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            font-weight: 500;
            width: 128px;
            height: 40px;
          }
          .dropdown {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            background: #e5e5e5;
            border-radius: 4px;
            z-index: 10;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
            gap: 1px;
          }
          .dropdown > button {
            display: block;
            width: 128px;
            height: 40px;
            padding: 5px 10px;
            text-align: left;
            border: none;
            background: white;
            cursor: pointer;
          }
          .dropdown > button:hover {
            background-color: #e4f7ee;
          }
        `}
      </style>
    </>
  );
}
