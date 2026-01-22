import fs from "fs/promises";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkTextPreview from "remark-preview-to-frontmatter";

const doc = await fs.readFile("tests/input.md");

const file = await remark()
  .use(remarkFrontmatter)
  .use(remarkTextPreview, { charLimit: 350 })
  .process(doc);

await fs.writeFile("tests/output.md", String(file));
