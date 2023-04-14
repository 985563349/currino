import type { ArrayLikeIteratee } from './types/common';
import { curry } from './curry';

interface CurrinoForEach {
  <T>(iteratee: ArrayLikeIteratee<T, any>, arrayLink: ArrayLike<T>): ArrayLike<T>;
  <T>(iteratee: ArrayLikeIteratee<T, any>): (arrayLink: ArrayLike<T>) => ArrayLike<T>;
}

export const forEach: CurrinoForEach = curry((iteratee: any, arrayLink: any) => {
  let i = -1;
  const length = arrayLink?.length ?? 0;

  while (++i < length) {
    if (iteratee(arrayLink[i], i, arrayLink) === false) {
      break;
    }
  }

  return arrayLink;
});
