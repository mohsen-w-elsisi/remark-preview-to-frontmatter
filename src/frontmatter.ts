import type { Root } from "mdast";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import * as yaml from "yaml";

export default function modifyFrontmatter(
  tree: Root,
  key: string,
  previewText: string,
) {
  let frontmatterNodeExists = addPropertyIfYamlExists(tree, key, previewText);

  if (!frontmatterNodeExists) {
    insertNewYamlNode(key, previewText, tree);
  }
}

function addPropertyIfYamlExists(tree: Root, key: string, previewText: string) {
  let nodeFound = false;
  visit(tree, "yaml", (node) => {
    nodeFound = true;
    node.value = addYamlProperty(node.value, key, previewText);
  });
  return nodeFound;
}

function insertNewYamlNode(key: string, previewText: string, tree: Root) {
  const yamlContent = addYamlProperty("", key, previewText);
  const yamlNode = u("yaml", yamlContent);
  tree.children.unshift(yamlNode);
}

function addYamlProperty(
  yamlString: string,
  frontmatterKey: string,
  previewText: string,
) {
  const parsedYaml = yaml.parse(yamlString) ?? {};
  parsedYaml[frontmatterKey] = previewText;
  return yaml.stringify(parsedYaml);
}
