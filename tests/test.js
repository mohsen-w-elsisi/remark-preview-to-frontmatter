import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkTextPreview from "remark-preview-to-frontmatter";

const process = async (content, options) => {
  const file = await remark()
    .use(remarkFrontmatter)
    .use(remarkTextPreview, options)
    .process(content);
  return String(file);
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "fixtures");

const readFixture = async (filename) => {
  return readFile(path.join(fixturesDir, filename), "utf-8");
};

const checkFixture = async (inputName, options, expectedName) => {
  const input = await readFixture(inputName);
  const expected = await readFixture(
    expectedName || inputName.replace(/\.md$/, ".expected.md"),
  );
  const output = await process(input, options);
  assert.equal(output, expected);
};

describe("remark-preview-to-frontmatter", () => {
  it("extracts text and adds it to frontmatter", async () => {
    await checkFixture("basic.md");
  });

  it("updates existing frontmatter", async () => {
    await checkFixture("existing-frontmatter.md");
  });

  // it("respects the charLimit option", async () => {
  //   await checkFixture("counting.md", { charLimit: 7 });
  // });

  // it('handles "break" policy', async () => {
  //   await checkFixture(
  //     "hello-world.md",
  //     { charLimit: 8, trailingWordBreakPolicy: "break" },
  //     "hello-world-break.expected.md",
  //   );
  // });

  // it('handles "remove" policy', async () => {
  //   await checkFixture(
  //     "hello-world.md",
  //     {
  //       charLimit: 8,
  //       trailingWordBreakPolicy: "remove",
  //     },
  //     "hello-world-remove.expected.md",
  //   );
  // });

  // it('handles "full word" policy', async () => {
  //   await checkFixture(
  //     "hello-world.md",
  //     {
  //       charLimit: 8,
  //       trailingWordBreakPolicy: "full word",
  //     },
  //     "hello-world-full.expected.md",
  //   );
  // });

  // it("customizes the frontmatter key", async () => {
  //   await checkFixture(
  //     "content.md",
  //     { frontmatterKey: "description" },
  //     "content-custom-key.expected.md",
  //   );
  // });

  // it("handles ellipsis option", async () => {
  //   await checkFixture(
  //     "content.md",
  //     { appendEllipsis: false },
  //     "content-no-ellipsis.expected.md",
  //   );
  // });

  // it("replaces all newlines with spaces when allowMultipleLines is false", async () => {
  //   await checkFixture("multiline-3.md", {
  //     allowMultipleLines: false,
  //   });
  // });

  // it("preserves newlines when allowMultipleLines is true", async () => {
  //   // Note: extractPreviewText adds a space after every node, so we might get "Line 1 \nLine 2 "
  //   await checkFixture("multiline-2.md", {
  //     allowMultipleLines: true,
  //     appendEllipsis: false,
  //   });
  // });
});
