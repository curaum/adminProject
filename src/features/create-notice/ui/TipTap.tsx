"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Tiptap.css";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { useRef, useState } from "react";
import { useClickOutside } from "@/shared/utils/useClickOutside";

interface TiptapProps {
  content: string;
  onChange: (value: string) => void;
}

const Tiptap = ({ content, onChange }: TiptapProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [showAlignOptions, setShowAlignOptions] = useState(false);
  const [showHeadingOptions, setShowHeadingOptions] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownAlignRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 드롭다운 닫기
  useClickOutside(dropdownRef, () => setShowHeadingOptions(false));
  useClickOutside(dropdownAlignRef, () => setShowAlignOptions(false));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
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
  const addFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    // 여기서는 서버 업로드 없이 로컬 URL 사용
    const fileURL = URL.createObjectURL(file);

    editor
      .chain()
      .focus()
      .insertContent(
        `<p><a href="${fileURL}" download="${file.name}">${file.name}</a></p>`
      )
      .run();

    // 선택 초기화
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div className="tiptap-container">
      {/* 툴바 */}
      <div className="toolbar">
        <button onClick={() => imageInputRef.current?.click()}>
          이미지 삽입
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
        <div
          ref={dropdownAlignRef}
          className="align-dropdown"
          style={{ position: "relative", display: "inline-block" }}
        >
          <button onClick={() => setShowAlignOptions((prev) => !prev)}>
            Align ▼
          </button>

          {showAlignOptions && (
            <div
              className="align-options"
              style={{
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
                  editor.chain().focus().setTextAlign("left").run();
                  setShowAlignOptions(false);
                }}
                className={editorState.isLeft ? "active" : ""}
              >
                Left
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
            </div>
          )}
        </div>
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
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => console.log(editor)}>콘솔</button>
      </div>

      {/* 에디터 */}
      <EditorContent editor={editor} className="editor" />
    </div>
  );
};

export default Tiptap;
