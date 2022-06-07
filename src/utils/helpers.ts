export const numberOfLettersAndEllipsis = (str: string, n: number) => {
  return str?.substring(0, n - 1).trim() + '\u2026' ?? '';
};
