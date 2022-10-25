export function forEachRight<T>(
  iteratee: (item: T, index: number, array: T[]) => boolean | void,
  array: T[]
) {
  let i = array.length;

  while (i--) {
    if (iteratee(array[i], i, array) === false) {
      break;
    }
  }

  return array;
}
