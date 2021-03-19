/**
 * 配列を分割
 * @template T 配列の要素のtype
 * @param array - 分割する配列
 * @param size - チャンクの長さ
 * @returns chunked array
 */
const arrayChunk = <T>(array:Array<T>, size:number):Array<typeof array> => {
  return array.reduce((acc:Array<typeof array>, _, index) => {
    if ((index % size) === 0) {
      return [...acc, array.slice(index, index + size)]
    } else {
      return acc
    }
  }, [])
}

const reorder = <T>(arrayLike: T[], from: number, to: number): T[] => {
  const res = Array.from(arrayLike)
  const removed = res.splice(from, 1)
  res.splice(to, 0, ...removed)
  return res
}

export { arrayChunk, reorder }
