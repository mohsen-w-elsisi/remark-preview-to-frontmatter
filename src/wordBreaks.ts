export type TrailingWordBreakPolicy = "break" | "remove" | "full word";

export default function trimPreviewTextToLength(
  text: string,
  limit: number,
  policy: TrailingWordBreakPolicy,
): string {
  let trimmedText = limit >= text.length ? text : text.slice(0, limit);
  return applyTrailingWordBreakPolicy(text, trimmedText, policy);
}

function applyTrailingWordBreakPolicy(
  fullText: string,
  trimmedText: string,
  policy: TrailingWordBreakPolicy,
): string {
  if (policy == "break") return trimmedText;

  const [lastWordInPreview, lastWordInfullText] = getLastWords(
    fullText,
    trimmedText,
  );

  if (lastWordInPreview === lastWordInfullText) return trimmedText;

  if (policy == "remove") {
    const previewWords = trimmedText.split(" ");
    previewWords.pop();
    return previewWords.join(" ");
  } else if (policy == "full word") {
    const previewWords = trimmedText.split(" ");
    previewWords.pop();
    previewWords.push(lastWordInfullText);
    return previewWords.join(" ");
  }

  throw new Error(`Unknown trailing word break policy: ${policy}`);
}

function getLastWords(fullText: string, textPreview: string) {
  const previewTextWords = textPreview.split(" ");
  const fullTextWords = fullText.split(" ");

  const lastWordIndex = previewTextWords.length - 1;

  const lastWordInPreview = previewTextWords[lastWordIndex];
  const lastWordInfullText = fullTextWords[lastWordIndex];

  return [lastWordInPreview, lastWordInfullText];
}
