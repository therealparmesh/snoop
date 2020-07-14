export interface Call<T extends (...args: any) => any> {
  arguments: Parameters<T>;
  result: ReturnType<T>;
  error: Error;
}

export function snoop<T extends (...args: any) => any>(
  fn: T,
): {
  fn: T;
  testID: number;
  called: boolean;
  notCalled: boolean;
  calledOnce: boolean;
  callCount: number;
  calls: Call<T>[];
  firstCall: Call<T>;
  lastCall: Call<T>;
  calledBefore: (other: typeof snoop) => boolean;
  calledAfter: (other: typeof snoop) => boolean;
  calledImmediatelyBefore: (other: typeof snoop) => boolean;
  calledImmediatelyAfter: (other: typeof snoop) => boolean;
};
