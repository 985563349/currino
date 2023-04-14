import type { ArrayLikeIteratee } from './types/common';
import { curry } from './curry'

interface CurrinoForEachRight {
  <T>(iteratee: ArrayLikeIteratee<T, any>, arrayLink: ArrayLike<T>): ArrayLike<T>;
  <T>(iteratee: ArrayLikeIteratee<T, any>): (arrayLink: ArrayLike<T>) => ArrayLike<T>;
}

export const forEachRight: CurrinoForEachRight = curry((iteratee: any, arrayLink: any) => {
  let i = arrayLink?.length ?? 0;

  while (i--) {
    if (iteratee(arrayLink[i], i, arrayLink) === false) {
      break;
    }
  }

  return arrayLink;
});
