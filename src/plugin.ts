import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import * as yaml from "yaml";

interface PluginOptions {
  charLimit?: number;
  frontmatterKey?: string;
}

const defaultOptions: PluginOptions = {
  charLimit: 200,
  frontmatterKey: "preview",
} as const;

function remarkTextPreview(options: PluginOptions = {}): (tree: Root) => void {
  const {
    charLimit = defaultOptions.charLimit as number,
    frontmatterKey = defaultOptions.frontmatterKey as string,
  } = options;

  return function (tree) {
    let previewText = "";

    visit(tree, "text", (node) => {
      if (previewText.length >= charLimit) return;

      if (node.value) {
        previewText += node.value + " ";
      }
    });

    previewText = previewText.replace("\n", " ");

    previewText = previewText.trim();

    if (previewText.length > charLimit) {
      previewText = previewText.slice(0, charLimit);
    }

    previewText = previewText + "...";

    let frontmatterNodeExists = false;

    visit(tree, "yaml", (node) => {
      frontmatterNodeExists = true;
      node.value = addYamlProperty(node.value, frontmatterKey, previewText);
    });

    if (!frontmatterNodeExists) {
      const yamlContent = `${frontmatterKey}: ${previewText}`;
      const yamlNode = u("yaml", yamlContent);
      tree.children.unshift(yamlNode);
    }
  };
}

function addYamlProperty(
  yamlString: string,
  frontmatterKey: string,
  previewText: string,
) {
  const parsedYaml = yaml.parse(yamlString);
  parsedYaml[frontmatterKey] = previewText;
  return yaml.stringify(parsedYaml);
}

export default remarkTextPreview;
