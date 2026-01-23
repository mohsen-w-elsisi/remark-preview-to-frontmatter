import { describe, it } from "node:test";
import checkFixture from "./testUtils.js";

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
    await checkFixture(
      "multiline.md",
      {
        allowMultipleLines: true,
      },
      "multiline-allowed.expected.md",
    );
  });

  it("handles text with multiple formatting options", async () => {
    await checkFixture("formatting.md");
  });
});
