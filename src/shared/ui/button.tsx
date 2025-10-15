interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  text,
  disabled = false,
  onClick,
  width = "360px",
  height = "48px",
  type = "button",
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={!disabled ? onClick : undefined} // 비활성화 시 클릭 막기
        className={`button ${disabled ? "disabled" : "active"}`}
        style={{ width, height }}
      >
        {text}
      </button>
      <style jsx>{`
        .button {
          border-radius: 4px;
          font-weight: 500;
          flex-shrink: 0;
          border: 0;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        /* 비활성화 상태 */
        .button.disabled {
          background: #f5f7f7;
          color: #7c7c7c;
          cursor: not-allowed;
        }

        /* 활성화 상태 */
        .button.active {
          background: #51c37e;
          color: #ffffff;
        }

        .button.active:hover {
          background-color: #45ad6f;
        }
      `}</style>
    </>
  );
};
