import type { Root } from "mdast";
import { visit } from "unist-util-visit";

function extractPreviewText(tree: Root, charLimit: number) {
  let previewText = "";

  visit(tree, ["text", "code", "inlineCode"], (node) => {
    if (previewText.length >= charLimit) return;

    // @ts-ignore
    if (node.value) {
      // @ts-ignore
      previewText += node.value + " ";
    }
  });
  return previewText;
}

export default extractPreviewText;
