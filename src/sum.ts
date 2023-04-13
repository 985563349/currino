import { curry } from './curry';

interface CurrinoSum {
  (a: number, b: number): number;
  (a: number): (b: number) => number;
}

export const sum: CurrinoSum = curry((a: any, b: any) => {
  return a + b;
});
