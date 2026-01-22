import type { Root } from "mdast";
import { visit } from "unist-util-visit";

function extractPreviewText(tree: Root, charLimit: number) {
  let previewText = "";

  visit(tree, "text", (node) => {
    if (previewText.length >= charLimit) return;

    if (node.value) {
      previewText += node.value + " ";
    }
  });
  return previewText;
}

export default extractPreviewText;
