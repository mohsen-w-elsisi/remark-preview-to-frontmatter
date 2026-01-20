import fs from 'fs/promises';
import { remark } from 'remark';

const doc = await fs.readFile("input.md")

const file = await remark().process(doc);

await fs.writeFile("output.md", String(file));
