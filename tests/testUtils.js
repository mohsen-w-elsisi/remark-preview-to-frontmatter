import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { remark } from "remark";
import { fromMarkdown as MdastFromMarkdown } from "mdast-util-from-markdown";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { frontmatter as frontmatterMicromask } from "micromark-extension-frontmatter";
import remarkFrontmatter from "remark-frontmatter";
import remarkPreviewToFrontmatter from "remark-preview-to-frontmatter";

const processMdWithPlugin = async (content, options) => {
  const file = await remark()
    .use(remarkFrontmatter)
    .use(remarkPreviewToFrontmatter, options)
    .process(content);
  return String(file);
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "fixtures");

const readFixture = async (filename) => {
  return readFile(path.join(fixturesDir, filename), "utf-8");
};

function parseMarkdownToMdast(expectedMarkdown) {
  return MdastFromMarkdown(expectedMarkdown, {
    extensions: [frontmatterMicromask()],
    mdastExtensions: [frontmatterFromMarkdown()],
  });
}

export default async function checkFixture(inputName, options, expectedName) {
  const inputMarkdown = await readFixture(inputName);

  expectedName = expectedName || inputName.replace(/\.md$/, ".expected.md");
  const expectedMarkdown = await readFixture(expectedName);
  const expectedAST = parseMarkdownToMdast(expectedMarkdown);

  const outputMarkdown = await processMdWithPlugin(inputMarkdown, options);
  const outputAST = parseMarkdownToMdast(outputMarkdown);

  assert.equal(JSON.stringify(outputAST), JSON.stringify(expectedAST));
}
