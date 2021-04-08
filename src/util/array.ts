const reorder = <T>(arrayLike: T[], from: number, to: number): T[] => {
  const res = Array.from(arrayLike)
  const removed = res.splice(from, 1)
  res.splice(to, 0, ...removed)
  return res
}

export { reorder }
