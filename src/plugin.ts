import type { Root } from "mdast";
import modifyFrontmatter from "./frontmatter.js";
import trimPreviewTextToLength, {
  TrailingWordBreakPolicy,
} from "./wordBreaks.js";
import extractPreviewText from "./extractPreviewText.js";

interface PluginOptions {
  charLimit?: number;
  trailingWordBreakPolicy?: TrailingWordBreakPolicy;
  frontmatterKey?: string;
  allowMultipleLines?: boolean;
  appendEllipsis?: boolean;
}

const defaultOptions: PluginOptions = {
  charLimit: 200,
  trailingWordBreakPolicy: "break",
  frontmatterKey: "preview",
  allowMultipleLines: false,
  appendEllipsis: true,
} as const;

function remarkTextPreview(options: PluginOptions = {}): (tree: Root) => void {
  const {
    charLimit = defaultOptions.charLimit as number,
    trailingWordBreakPolicy = defaultOptions.trailingWordBreakPolicy as TrailingWordBreakPolicy,
    frontmatterKey = defaultOptions.frontmatterKey as string,
    allowMultipleLines = defaultOptions.allowMultipleLines as boolean,
    appendEllipsis = defaultOptions.appendEllipsis as boolean,
  } = options;

  return function (tree) {
    let previewText = extractPreviewText(tree, charLimit);

    if (!allowMultipleLines) {
      previewText = previewText.replace("\n", " ");
      previewText = previewText.replace(/\s+/g, " ");
    }

    previewText = previewText.trim();

    previewText = trimPreviewTextToLength(
      previewText,
      charLimit,
      trailingWordBreakPolicy,
    );

    if (appendEllipsis) previewText = previewText + "...";

    modifyFrontmatter(tree, frontmatterKey, previewText);
  };
}

export default remarkTextPreview;
