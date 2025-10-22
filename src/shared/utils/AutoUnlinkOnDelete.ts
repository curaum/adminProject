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

            // 변경된 범위 계산
            const from = transaction.steps.length
              ? Math.min(...transaction.steps.map((s: any) => s.from ?? 0))
              : 0;
            const to = transaction.steps.length
              ? Math.max(...transaction.steps.map((s: any) => s.to ?? 0))
              : 0;

            // 편집된 범위 내 링크 마크 제거
            newState.doc.nodesBetween(from, to, (node, pos) => {
              node.marks.forEach((mark) => {
                if (mark.type.name === "link") {
                  tr = tr.removeMark(pos, pos + node.nodeSize, mark.type);
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
