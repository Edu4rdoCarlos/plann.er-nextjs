export const trimWithEllipsis = (text: string, maxLength?: number) => {
  if (text.length <= (maxLength || 10)) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
};
