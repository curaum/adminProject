"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.css";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle, Color, FontSize } from "@tiptap/extension-text-style";
import { useRef, useState } from "react";
import { useClickOutside } from "@/shared/utils/useClickOutside";

interface TiptapProps {
  content: string;
  onChange: (value: string) => void;
}
const COLORS = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFA500",
  "#800080",
  "#008080",
];
interface FontSizeOption {
  label: string;
  value: string;
}

const FONT_SIZE_OPTIONS: FontSizeOption[] = [
  { label: "아주 크게", value: "32px" },
  { label: "크게", value: "24px" },
  { label: "보통", value: "16px" },
  { label: "작게", value: "14px" },
];
const Tiptap = ({ content, onChange }: TiptapProps) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000000");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("보통");
  const applyColor = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setSelectedColor(color);
    setIsPaletteOpen(false); // 색상 선택 후 팔레트 닫기
  };

  const removeColor = () => {
    if (!editor) return;
    editor.chain().focus().unsetColor().run();
    setSelectedColor("");
    setIsPaletteOpen(false);
  };
  const applyFontSize = (opt: { label: string; value: string }) => {
    editor.chain().focus().setFontSize(opt.value).run();
    setShowFontSizeOptions(false);
    setSelectedLabel(opt.label);
  };

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [showAlignOptions, setShowAlignOptions] = useState(false);
  const [showFontSizeOptions, setShowFontSizeOptions] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownAlignRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useClickOutside(dropdownRef, () => setShowFontSizeOptions(false));
  useClickOutside(dropdownAlignRef, () => setShowAlignOptions(false));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Color,
      TextStyle,
      FontSize,
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) return { isBold: false, isItalic: false };
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
      };
      // 필요한 상태 추가
    },
  });

  if (!editor) return null;
  const addImageFromFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const url = URL.createObjectURL(file);

    editor.chain().focus().setImage({ src: url }).run();

    // 선택 초기화
    if (imageInputRef.current) imageInputRef.current.value = "";
  };
  return (
    <div className="tiptap-container">
      {/* 툴바 */}
      <div className="toolbar">
        {/* 폰트 크기 */}
        <div
          ref={dropdownRef}
          className="fontSize-dropdown"
          style={{ position: "relative", display: "inline-block" }}
        >
          <button onClick={() => setShowFontSizeOptions((prev) => !prev)}>
            <span>{selectedLabel}</span>
            <span>▼</span>
          </button>

          {showFontSizeOptions && (
            <div
              className="fontSize-options"
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "100%",
                left: 0,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "5px 0",
                zIndex: 10,
              }}
            >
              {FONT_SIZE_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => applyFontSize(opt)}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="bar"></div>
        {/* 폰트 색상 */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              padding: "4px 8px",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
              backgroundColor: selectedColor || "#fff",
            }}
            onClick={() => setIsPaletteOpen((prev) => !prev)}
          ></button>
          ▼{/* 팔레트 드롭다운 */}
          {isPaletteOpen && (
            <div
              style={{
                position: "absolute",
                top: 36,
                left: 0,
                display: "flex",
                gap: 6,
                padding: 6,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: 4,
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                zIndex: 10,
              }}
            >
              {COLORS.map((color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: 24,
                    height: 24,
                    border:
                      selectedColor === color
                        ? "2px solid #000"
                        : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => applyColor(color)}
                />
              ))}
              <button
                onClick={removeColor}
                style={{
                  padding: "0 6px",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
              >
                제거
              </button>
            </div>
          )}
        </div>
        <button onClick={() => imageInputRef.current?.click()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 17L9 10L13 16L16 13L20 17"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 20V4H20V20H4Z"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="15.5" cy="8.5" r="1.5" fill="#3A3A3A" />
          </svg>
        </button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={addImageFromFile}
        />

        {/* 텍스트 스타일 */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editorState.isBold ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 15.5C16 14.6257 15.6218 14.0608 15.1289 13.6699C14.6239 13.2696 14.0017 13.0639 13.5879 13H8V18H13.5879C14.0017 17.9361 14.6239 17.7304 15.1289 17.3301C15.6218 16.9392 16 16.3743 16 15.5ZM15.167 8.5C15.167 6.71988 14.0617 6.12093 13.5615 6H8V11H13.5615C14.0617 10.8791 15.167 10.2801 15.167 8.5ZM17.167 8.5C17.167 10.0198 16.6347 11.0892 15.9521 11.8047C16.0944 11.8951 16.2346 11.9943 16.3711 12.1025C17.2669 12.8127 18 13.9244 18 15.5C18 17.0756 17.2669 18.1873 16.3711 18.8975C15.5087 19.5812 14.4956 19.8995 13.7969 19.9912C13.7538 19.9969 13.7104 20 13.667 20H7C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4H13.667L13.8389 4.01465C15.0462 4.22592 17.167 5.46527 17.167 8.5Z"
              fill="#3A3A3A"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editorState?.isItalic ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.667 18.0004C15.2191 18.0005 15.667 18.4482 15.667 19.0004C15.667 19.5525 15.2191 20.0002 14.667 20.0004H4C3.44772 20.0004 3 19.5527 3 19.0004C3 18.4481 3.44772 18.0004 4 18.0004H14.667Z"
              fill="#3A3A3A"
            />
            <path
              d="M20.0002 4.00037C20.5524 4.00054 21.0002 4.44819 21.0002 5.00037C21.0002 5.55254 20.5524 6.00019 20.0002 6.00037H9.33325C8.78097 6.00037 8.33325 5.55265 8.33325 5.00037C8.33325 4.44808 8.78097 4.00037 9.33325 4.00037H20.0002Z"
              fill="#3A3A3A"
            />
            <path
              d="M13.7318 4.64392C13.9285 4.12799 14.5068 3.86922 15.0228 4.0658C15.5389 4.26244 15.7975 4.84074 15.6009 5.35681L10.2679 19.3568C10.0712 19.8727 9.4929 20.1315 8.97692 19.9349C8.46106 19.7382 8.20223 19.1599 8.39879 18.6439L13.7318 4.64392Z"
              fill="#3A3A3A"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 10.9336V4C6 3.44772 6.44772 3 7 3C7.55228 3 8 3.44772 8 4V10.9336C8.00003 13.0052 8.4041 14.2338 9.00977 14.9424C9.58439 15.6147 10.5002 16 12 16C13.4998 16 14.4156 15.6147 14.9902 14.9424C15.5959 14.2338 16 13.0052 16 10.9336V4C16 3.44772 16.4477 3 17 3C17.5523 3 18 3.44772 18 4V10.9336C18 13.1951 17.5707 14.9999 16.5098 16.2412C15.4177 17.5188 13.8335 18 12 18C10.1665 18 8.58228 17.5188 7.49023 16.2412C6.4293 14.9999 6.00003 13.1951 6 10.9336Z"
              fill="#3A3A3A"
            />
            <path
              d="M19 19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H19Z"
              fill="#3A3A3A"
            />
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editorState?.isStrike ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.99993 8.51476C6.99993 7.26795 7.36087 6.25632 8.03801 5.50206C8.7024 4.76204 9.58515 4.3651 10.4638 4.17003C12.1893 3.78698 14.166 4.11768 15.4394 4.50597C15.9676 4.66705 16.2654 5.22581 16.1044 5.75401C15.9433 6.28226 15.3846 6.58011 14.8564 6.41905C13.7471 6.08075 12.1501 5.84507 10.8974 6.12315C10.2869 6.25869 9.82987 6.4999 9.52629 6.838C9.2355 7.1619 8.99993 7.66885 8.99993 8.51476C8.99996 9.02567 9.10564 9.34191 9.23137 9.54991C9.35687 9.75747 9.54655 9.93041 9.83293 10.0841C10.4787 10.4306 11.3435 10.562 12.4931 10.8009C13.5221 11.0147 14.8072 11.3251 15.7402 12.1915C16.7542 13.1334 17.171 14.5351 16.9345 16.4825C16.8028 17.5668 16.2923 18.4088 15.5331 18.9913C14.8 19.5538 13.8897 19.8346 12.9833 19.9435C11.1827 20.1596 9.10837 19.7327 7.57414 19.0108C7.07463 18.7757 6.85985 18.1804 7.09465 17.6808C7.32979 17.181 7.92598 16.9662 8.42571 17.2013C9.67107 17.7873 11.3689 18.1233 12.745 17.9581C13.4271 17.8762 13.9574 17.6798 14.3163 17.4044C14.6489 17.149 14.8823 16.7918 14.9491 16.2413C15.1368 14.6957 14.7741 14.0234 14.3788 13.6564C13.9023 13.2139 13.1483 12.9796 12.0859 12.7589C11.1439 12.5632 9.8636 12.3704 8.88762 11.8468C8.3633 11.5655 7.87234 11.1669 7.52043 10.5851C7.16882 10.0035 6.99996 9.31144 6.99993 8.51476Z"
              fill="#3A3A3A"
            />
            <path
              d="M19 10.5001C19.8284 10.5001 20.5 11.1717 20.5 12.0001C20.5 12.8285 19.8284 13.5001 19 13.5001H5C4.17157 13.5001 3.5 12.8285 3.5 12.0001C3.5 11.1717 4.17157 10.5001 5 10.5001H19Z"
              fill="#3A3A3A"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* 정렬 */}
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("left").run();
            setShowAlignOptions(false);
          }}
          className={editorState.isLeft ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 10H14"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 15H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 20H14"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("center").run();
            setShowAlignOptions(false);
          }}
          className={editorState.isCenter ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 10H17"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 15H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 20H17"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("right").run();
            setShowAlignOptions(false);
          }}
          className={editorState.isRight ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 10H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 15H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 20H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            editor.chain().focus().setTextAlign("justify").run();
            setShowAlignOptions(false);
          }}
          className={editorState.isJustify ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 5H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 10H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 15H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 20H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* 문단 / 인용 */}
        {/* <button
          onClick={() => editor.chain().focus().toggleParagraph().run()}
          className={editor.isActive("paragraph") ? "active" : ""}
        >
          ¶
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="3.5"
              y="11.5"
              width="7"
              height="7"
              rx="1.5"
              fill="#3A3A3A"
              stroke="#3A3A3A"
            />
            <rect
              x="13.5"
              y="11.5"
              width="7"
              height="7"
              rx="1.5"
              fill="#3A3A3A"
              stroke="#3A3A3A"
            />
            <path
              d="M4 13C4 11.25 4.8 7.4 8 6"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 13C14 11.25 14.8 7.4 18 6"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* 리스트 */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 5H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 12H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 19H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="5" cy="19" r="2" fill="#3A3A3A" />
            <circle cx="5" cy="12" r="2" fill="#3A3A3A" />
            <circle cx="5" cy="5" r="2" fill="#3A3A3A" />
          </svg>{" "}
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 8H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 17H20"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 6L5.5 5V10"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 14.8045C4.5 14.2451 5.98423 13.3059 6.625 14.8232C7.375 16.5993 4.75 16.9022 4 19H7"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 12L20 12"
              stroke="#3A3A3A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
        </button>
      </div>

      {/* 에디터 */}
      <EditorContent editor={editor} className="editor" />
    </div>
  );
};

export default Tiptap;
