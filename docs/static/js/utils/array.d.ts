/**
 * 配列を分割
 * @template T 配列の要素のtype
 * @param array - 分割する配列
 * @param size - チャンクの長さ
 * @returns chunked array
 */
declare const arrayChunk: <T>(array: T[], size: number) => T[][];
declare const reorder: <T>(arrayLike: T[], from: number, to: number) => T[];
export { arrayChunk, reorder };
//# sourceMappingURL=array.d.ts.map