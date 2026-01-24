# remark-preview-to-markdown

[remark](https://github.com/remarkjs/remark) plugin to add text from the beginning of a document to a property in frontmatter.

## Contents

- [[#What is this?]]
- [[#When should I use this?]]
- [[#Install]]
- [[#Use]]
- [[#API]]
	- [[#PluginOptions]]

## What is this?

This is a [unified](https://github.com/unifiedjs/unified) ([remark](https://github.com/remarkjs/remark)) plugin that extracts some text from the beginning of a markdown file (not including frontmatter and comments) and adds the extracted text as a frontmatter property. 

## When should I use this?

This plugin is useful in use cases where a preview of the document must be part of the files metadata. For example, blogging sites may use this to show a snippet of each individual blog post in a list of multiple posts. 

This plugin selects the snippet based on a number of characters or words, hence for something like an abstract in a journal article, this plugin is not useful. 

## Install


## Use

Consider `exmaple.md`

```md
_Lorem Ipsum_ is simply **dummy text** of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

sourced from [lipsum.com](https://www.lipsum.com/)
```

To add a preview of this file in markdown, the following is done:

```js
import fs from "fs/promises";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkPreviewToFrontmatter from "remark-preview-to-frontmatter";

const inputFIle = "./example.md";
const outputFile = "./output.md";

const inputMarkdown = await fs.readFile(inputFIle, "utf-8");

const outputMarkdown = await remark()
  .use(remarkFrontmatter)
  .use(remarkPreviewToFrontmatter, { charLimit: 100 })
  .process(inputMarkdown);

await fs.writeFile(outputFile, String(outputMarkdown));

```

`output.md` would look like this

```md
---
preview: Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the ...

---

*Lorem Ipsum* is simply **dummy text** of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

sourced from [lipsum.com](https://www.lipsum.com/)
```

## API

The package only provides the default export used as a plugin to remark. Provding options is of course optional.

```js
remark().use(remarkPreviewToFrontmatter, options)
```

### PluginOptions 

| Field                     | type         | default | purpose                                                              |
| ------------------------- | ------------ | ------- | -------------------------------------------------------------------- |
| `charLimit`               | int          | 200     | the number of maximum number of characters to include in the preview |
| `frontmatterKey`          | string       | preview | defined the key to use in the frontmatter                            |
| `appendEllipsis`          | bool         | true    | whether to add "..." at end of preview                               |
| `allowMultipleLines`      | bool         | false   | removes new lines and redundant whitespace from the text             |
| `trailingWordBreakPolicy` | (see bellow) | break   | how to handle a word if the charLimit lies within it                 |

`trailingWordBreakPolicy` acts when only part of the last word is included in the preview. For example, if the last word is *hello* and the `charLimit` is such that only the first three letters are taken, each policy will handle this scenario differently:

| policy      | result      | explanation                                                     |
| ----------- | ----------- | --------------------------------------------------------------- |
| `break`     | hel         | will strictlly apply the character limit                        |
| `full word` | hello       | will preserve the whole word, exceed the limit                  |
| `remove`    | *(nothing)* | will remove the incomplete word entirely, going under the limit |
