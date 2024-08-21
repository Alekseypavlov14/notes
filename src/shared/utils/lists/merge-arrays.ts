export function mergeArrays<T>(arrays: T[][]): T[] {
  return arrays.reduce((nextArray, arrays) => arrays.concat(nextArray), [])
}
