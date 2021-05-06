/**
 * rfill.ts
 * Copyright (C) 2021
 *
 * @author Edgard Leal <edgard.leal@gmail.com>
 * @module rfill.ts
 */
export default function rfill(text: string, len: number = 10, charToFill = ' '): string {
  const curLen = text.length;
  const difference = len - curLen;
  if (difference < 0) {
    return text.substr(0, len);
  }
  const spaces = difference > 0 ? new Array(difference).fill(charToFill).join('') : '';
  return `${text}${spaces}`;
}
