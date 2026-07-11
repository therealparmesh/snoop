import { describe, expect, test } from 'bun:test';

import { snoop } from '../src/index.js';

describe('snoop', () => {
  test('starts with an empty call history', () => {
    const spy = snoop(() => undefined);

    expect(spy.testID).toBeNumber();
    expect(spy.called).toBe(false);
    expect(spy.notCalled).toBe(true);
    expect(spy.calledOnce).toBe(false);
    expect(spy.callCount).toBe(0);
    expect(spy.calls).toEqual([]);
    expect(spy.firstCall).toBeUndefined();
    expect(spy.lastCall).toBeUndefined();
  });

  test('records arguments and returned values', () => {
    const spy = snoop((a, b) => a + b);

    expect(spy.fn(1, 1)).toBe(2);
    expect(spy.calledOnce).toBe(true);
    expect(spy.fn(2, 2)).toBe(4);

    expect(spy.called).toBe(true);
    expect(spy.notCalled).toBe(false);
    expect(spy.calledOnce).toBe(false);
    expect(spy.callCount).toBe(2);
    expect(spy.calls).toEqual([
      { arguments: [1, 1], error: undefined, result: 2 },
      { arguments: [2, 2], error: undefined, result: 4 },
    ]);
    expect(spy.firstCall).toBe(spy.calls[0]);
    expect(spy.lastCall).toBe(spy.calls[1]);
  });

  test('records and swallows thrown values', () => {
    const error = { message: 'nope' };
    const spy = snoop(() => {
      throw error;
    });

    expect(spy.fn()).toBeUndefined();
    expect(spy.firstCall).toEqual({
      arguments: [],
      error,
      result: undefined,
    });
  });

  test('compares global call order with the original edge cases', () => {
    const first = snoop(() => 'first');
    const second = snoop(() => 'second');

    expect(first.calledBefore(second)).toBe(false);

    first.fn();

    expect(first.calledBefore(second)).toBe(true);
    expect(first.calledAfter(second)).toBe(false);
    expect(first.calledImmediatelyBefore(second)).toBe(false);
    expect(first.calledImmediatelyAfter(second)).toBe(false);

    second.fn();

    expect(first.calledBefore(second)).toBe(true);
    expect(first.calledAfter(second)).toBe(false);
    expect(first.calledImmediatelyBefore(second)).toBe(true);
    expect(first.calledImmediatelyAfter(second)).toBe(false);
    expect(second.calledBefore(first)).toBe(false);
    expect(second.calledAfter(first)).toBe(true);
    expect(second.calledImmediatelyBefore(first)).toBe(false);
    expect(second.calledImmediatelyAfter(first)).toBe(true);
  });
});
