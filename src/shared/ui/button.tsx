interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
  activeStyle?: ButtonStyle;
  inactiveStyle?: ButtonStyle;
}

type ButtonStyle = {
  borderColor?: string;
  color?: string;
  backgroundColor?: string; // 필요시
};

export const Button = ({
  text,
  disabled = false,
  onClick,
  width = "360px",
  height = "48px",
  type = "button",
  activeStyle,
  inactiveStyle,
}: ButtonProps) => {
  return (
    <>
      <button
        type={type}
        onClick={!disabled ? onClick : undefined} // 비활성화 시 클릭 막기
        className="button"
        style={{
          width,
          height,

          border: disabled
            ? `1px solid ${inactiveStyle?.borderColor}`
            : `1px solid ${activeStyle?.borderColor}`,

          color: disabled ? inactiveStyle?.color : activeStyle?.color,
          backgroundColor: disabled
            ? inactiveStyle?.backgroundColor
            : activeStyle?.backgroundColor,
        }}
      >
        {text}
      </button>
      <style jsx>{`
        .button {
          border-radius: 4px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};
export default Button;
