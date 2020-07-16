export interface Fn {
  (...args: any): any;
}

export interface Call<T extends Fn> {
  arguments: Parameters<T>;
  result: ReturnType<T>;
  error: Error;
}

export interface Snoop<T extends Fn> {
  fn: T;
  testID: number;
  called: boolean;
  notCalled: boolean;
  calledOnce: boolean;
  callCount: number;
  calls: Call<T>[];
  firstCall: Call<T>;
  lastCall: Call<T>;
  calledBefore: (other: Snoop<T>) => boolean;
  calledAfter: (other: Snoop<T>) => boolean;
  calledImmediatelyBefore: (other: Snoop<T>) => boolean;
  calledImmediatelyAfter: (other: Snoop<T>) => boolean;
}

export function snoop<T extends Fn>(fn: T): Snoop<T>;
