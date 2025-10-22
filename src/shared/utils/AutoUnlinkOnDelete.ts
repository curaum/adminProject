// AutoUnlinkOnDelete.ts
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

const AutoUnlinkOnDelete = Extension.create({
  name: "autoUnlinkOnDelete",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("autoUnlinkOnDelete"),
        appendTransaction: (transactions, oldState, newState) => {
          let tr = newState.tr;
          let modified = false;

          transactions.forEach((transaction) => {
            if (!transaction.docChanged) return;

            newState.doc.descendants((node, pos) => {
              const linkMark = newState.schema.marks.link;
              if (!linkMark) return;

              node.marks.forEach((mark) => {
                if (mark.type === linkMark && node.textContent.length === 0) {
                  // 노드 전체가 아닌 텍스트 범위만 제거
                  tr = tr.removeMark(pos, pos + node.nodeSize - 2, linkMark);
                  modified = true;
                }
              });
            });
          });

          return modified ? tr : null;
        },
      }),
    ];
  },
});

export default AutoUnlinkOnDelete;
