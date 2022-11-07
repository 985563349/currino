export function forEach<T>(
  iteratee: (item: T, index: number, array: T[]) => boolean | void,
  array: T[]
) {
  let i = 0;

  while (i < array.length) {
    if (iteratee(array[i], i, array) === false) {
      break;
    }
    i++;
  }
}
