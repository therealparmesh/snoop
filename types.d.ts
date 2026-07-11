export type Fn = (...args: any[]) => any;

export interface Call<T extends Fn> {
  arguments: Parameters<T>;
  result: ReturnType<T> | undefined;
  error: unknown;
}

export interface SnoopReference {
  readonly testID: number;
  readonly notCalled: boolean;
}

export interface Snoop<T extends Fn> {
  fn: T;
  readonly testID: number;
  readonly called: boolean;
  readonly notCalled: boolean;
  readonly calledOnce: boolean;
  readonly callCount: number;
  readonly calls: Call<T>[];
  readonly firstCall: Call<T> | undefined;
  readonly lastCall: Call<T> | undefined;
  calledBefore: (other: SnoopReference) => boolean;
  calledAfter: (other: SnoopReference) => boolean;
  calledImmediatelyBefore: (other: SnoopReference) => boolean;
  calledImmediatelyAfter: (other: SnoopReference) => boolean;
}

export function snoop<T extends Fn>(fn: T): Snoop<T>;
