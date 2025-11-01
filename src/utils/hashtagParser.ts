export const hashtagParser = (tags: string[]): string[] => {
  return tags.map((tag) => tag.replace(/^#/, '').trim());
};
