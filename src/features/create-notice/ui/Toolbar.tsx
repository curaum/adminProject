"use client";
import { Editor } from "@tiptap/react";
import { useRef } from "react";
export const Toolbar = (editor: Editor, addImageFromFile, addFile) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="toolbar">
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
      <button onClick={() => fileInputRef.current?.click()}>첨부파일</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={addFile}
      />
      {/* 헤딩 */}
      <div
        ref={dropdownRef}
        className="heading-dropdown"
        style={{ position: "relative", display: "inline-block" }}
      >
        <button onClick={() => setShowHeadingOptions((prev) => !prev)}>
          Heading ▼
        </button>

        {showHeadingOptions && (
          <div
            className="heading-options"
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
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                setShowHeadingOptions(false);
              }}
              className={editorState?.isHeading1 ? "active" : ""}
            >
              H1
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                setShowHeadingOptions(false);
              }}
              className={editorState?.isHeading2 ? "active" : ""}
            >
              H2
            </button>
            <button
              onClick={() => {
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                setShowHeadingOptions(false);
              }}
              className={editorState?.isHeading3 ? "active" : ""}
            >
              H3
            </button>
          </div>
        )}
      </div>
      {/* 텍스트 스타일 */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editorState.isBold ? "active" : ""}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editorState?.isItalic ? "active" : ""}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "active" : ""}
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editorState?.isStrike ? "active" : ""}
      >
        S
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
        Center
      </button>
      <button
        onClick={() => {
          editor.chain().focus().setTextAlign("right").run();
          setShowAlignOptions(false);
        }}
        className={editorState.isRight ? "active" : ""}
      >
        Right
      </button>
      <button
        onClick={() => {
          editor.chain().focus().setTextAlign("justify").run();
          setShowAlignOptions(false);
        }}
        className={editorState.isJustify ? "active" : ""}
      >
        Justify
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
        ❝ ❞
      </button>

      {/* 리스트 */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "active" : ""}
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "active" : ""}
      >
        1. List
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Horizontal rule
      </button>
      <button onClick={() => console.log(editor)}>콘솔</button>
    </div>
  );
};
