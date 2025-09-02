export function limitTextInView({ text, limit }: { text: string; limit: number }) {
  const textCompressed = text.substring(0, limit - 3);

  if (textCompressed.length === text.length) {
    return textCompressed;
  }

  return textCompressed + '...';
}
