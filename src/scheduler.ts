import { curry } from './curry';

type SchedulerResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

interface CurrinoScheduler {
  <T extends readonly (() => Promise<unknown>)[] | []>(max: number, tasks: T): Promise<{
    -readonly [P in keyof T]: SchedulerResult<Awaited<ReturnType<T[P]>>>;
  }>;
  <T extends readonly (() => Promise<unknown>)[] | []>(max: number): (tasks: T) => Promise<{
    -readonly [P in keyof T]: SchedulerResult<Awaited<ReturnType<T[P]>>>;
  }>;
}

export const scheduler: CurrinoScheduler = curry((max: any, tasks: any) => {
  if (tasks.length <= 0) return Promise.resolve([] as any);

  return new Promise((resolve) => {
    let index = 0;
    let count = 0;
    const result = new Array(tasks.length);

    const executeTask = (taskIndex: number) => {
      const currentTask = tasks[taskIndex]();

      currentTask
        .then((value: any) => {
          result[taskIndex] = { status: 'fulfilled', value };
        })
        .catch((reason: any) => {
          result[taskIndex] = { status: 'rejected', reason };
        })
        .finally(() => {
          max++;
          count++;
          if (count === tasks.length) {
            resolve(result);
          } else {
            start();
          }
        });
    };

    const start = () => {
      while (index < tasks.length && max > 0) {
        executeTask(index++);
        max--;
      }
    };

    start();
  });
});
