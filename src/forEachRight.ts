import type { ArrayLikeIterator } from './types/common';

export function forEachRight<T>(iteratee: ArrayLikeIterator<T, any>, arrayLink: ArrayLike<T>) {
  let i = arrayLink?.length ?? 0;

  while (i--) {
    if (iteratee(arrayLink[i], i, arrayLink) === false) {
      break;
    }
  }

  return arrayLink;
}
