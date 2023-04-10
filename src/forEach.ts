import type { ArrayLikeIterator } from './types/common';

export function forEach<T>(iteratee: ArrayLikeIterator<T, any>, arrayLink: ArrayLike<T>) {
  let i = -1;
  const length = arrayLink?.length ?? 0;

  while (++i < length) {
    if (iteratee(arrayLink[i], i, arrayLink) === false) {
      break;
    }
  }
  return arrayLink;
}
