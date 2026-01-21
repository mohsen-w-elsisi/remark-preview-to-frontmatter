/**
 * @import {Root} from 'mdast'
 */

import { visit } from "unist-util-visit";
import { u } from "unist-builder";

/**
 * Extract a text preview from a markdown and add it to the frontmatter.
 *
 * @returns Transform.
 */
export default function remarkTextPreview() {
  const charLimit = 200;
  const frontmatterKey = "preview";
  const forbiddenTypes = new Set(["yaml", "html"]);

  /**
   * @param {Root} tree
   * @return {undefined}
   */
  return function (tree) {
    let previewText = "";

    visit(tree, (node, index, parent) => {
      if (previewText.length >= charLimit) return;
      if (forbiddenTypes.has(node.type)) return;

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

function addYamlProperty(yaml, frontmatterKey, previewText) {
  const lines = yaml.split("\n");
  lines.push(`${frontmatterKey}: ${previewText}`);
  const newYaml = lines.join("\n");
  return newYaml;
}
