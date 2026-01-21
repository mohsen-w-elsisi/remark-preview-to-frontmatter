import fs from "fs/promises";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkTextPreview from "./plugin.js";

const doc = await fs.readFile("input.md");

const file = await remark()
  .use(remarkFrontmatter)
  .use(remarkTextPreview)
  .process(doc);

await fs.writeFile("output.md", String(file));
