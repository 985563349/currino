interface CurriedFunction1<T1, R> {
  (): CurriedFunction1<T1, R>;
  (t1: T1): R;
}

interface CurriedFunction2<T1, T2, R> {
  (): CurriedFunction2<T1, T2, R>;
  (t1: T1): CurriedFunction1<T2, R>;
  (t1: T1, t2: T2): R;
}

interface CurriedFunction3<T1, T2, T3, R> {
  (): CurriedFunction3<T1, T2, T3, R>;
  (t1: T1): CurriedFunction2<T2, T3, R>;
  (t1: T1, t2: T2): CurriedFunction1<T3, R>;
  (t1: T1, t2: T2, t3: T3): R;
}

interface CurriedFunction4<T1, T2, T3, T4, R> {
  (): CurriedFunction4<T1, T2, T3, T4, R>;
  (t1: T1): CurriedFunction3<T2, T3, T4, R>;
  (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): R;
}

interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
  (): CurriedFunction5<T1, T2, T3, T4, T5, R>;
  (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
  (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction1<T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}

interface CurrinoCurry {
  <T1, R>(func: (t1: T1) => R): CurriedFunction1<T1, R>;
  <T1, T2, R>(func: (t1: T1, t2: T2) => R): CurriedFunction2<T1, T2, R>;
  <T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R): CurriedFunction3<T1, T2, T3, R>;
  <T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R): CurriedFunction4<T1, T2, T3, T4, R>;
  <T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R): CurriedFunction5<T1, T2, T3, T4, T5, R>;
  (func: (...args: any[]) => any): (...args: any[]) => any;
}

export const curry: CurrinoCurry = (func: Function) => {
  return function curried(this: any, ...args: any[]) {
    if (args.length === func.length) {
      return func.apply(this, args);
    } else {
      return function (this: any, ...innerArgs: any[]) {
        return curried.apply(this, args.concat(innerArgs));
      };
    }
  };
};
