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
    await checkFixture("hello-world.md");
  });

  it("updates existing frontmatter", async () => {
    await checkFixture("existing-frontmatter.md");
  });

  it("respects the charLimit option", async () => {
    await checkFixture("counting.md", { charLimit: 7 });
  });

  it('handles "full word" trailing word policy', async () => {
    await checkFixture("hello-world.md", {
      charLimit: 8,
      trailingWordBreakPolicy: "full word",
    });
  });

  it('handles "remove" trailing word policy', async () => {
    await checkFixture(
      "hello-world.md",
      {
        charLimit: 8,
        trailingWordBreakPolicy: "remove",
      },
      "hello-world-remove.expected.md",
    );
  });

  it("customizes the frontmatter key", async () => {
    await checkFixture(
      "hello-world.md",
      { frontmatterKey: "describtion" },
      "hello-world-custom-key.expected.md",
    );
  });

  it("handles ellipsis option", async () => {
    await checkFixture(
      "hello-world.md",
      { appendEllipsis: false },
      "hello-world-no-ellipsis.expected.md",
    );
  });

  it("replaces all newlines with spaces when allowMultipleLines is false", async () => {
    await checkFixture("multiline.md", {
      allowMultipleLines: false,
    });
  });

  it("preserves newlines when allowMultipleLines is true", async () => {
    await checkFixture("multiline.md", {
      allowMultipleLines: true,
    }, "multiline-allowed.expected.md");
  });
});
