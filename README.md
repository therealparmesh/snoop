# snoop 🎵

[![npm version](https://img.shields.io/npm/v/snoop.svg)](https://www.npmjs.com/package/snoop)
[![npm downloads](https://img.shields.io/npm/dt/snoop.svg)](https://www.npmjs.com/package/snoop)
[![Bun CI](https://github.com/therealparmesh/snoop/actions/workflows/ci.yml/badge.svg)](https://github.com/therealparmesh/snoop/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/snoop.svg)](LICENSE)

> Easy breezy test spies fo sheezy.

![Snoop Dogg](./snoop.gif)

Create small, dependency-free function spies that record calls, results, errors,
and relative call order. Snoop collaborates with everyone.

## Installation

```sh
npm install --save-dev snoop
```

Other package managers:

```sh
yarn add --dev snoop
pnpm add --save-dev snoop
bun add --dev snoop
```

## Usage

### With [uvu](https://github.com/lukeed/uvu)

```js
import { snoop } from 'snoop';
import { test } from 'uvu';
import * as assert from 'uvu/assert';

const add = (a, b) => a + b;

test('add', () => {
  const addFn = snoop(add);
  const anotherAddFn = snoop(add);

  addFn.fn(1, 1);
  anotherAddFn.fn(1, 1);
  addFn.fn(2, 2);
  anotherAddFn.fn(2, 2);

  assert.ok(addFn.called);
  assert.not(addFn.notCalled);
  assert.not(addFn.calledOnce);
  assert.is(addFn.callCount, 2);
  assert.equal(addFn.calls[0].arguments, [1, 1]);
  assert.equal(addFn.calls[1].arguments, [2, 2]);
  assert.is(addFn.calls[0].result, 2);
  assert.is(addFn.calls[1].result, 4);
  assert.not(addFn.firstCall.error);
  assert.not(addFn.lastCall.error);
  assert.ok(addFn.calledBefore(anotherAddFn));
  assert.ok(addFn.calledAfter(anotherAddFn));
  assert.ok(addFn.calledImmediatelyBefore(anotherAddFn));
  assert.not(addFn.calledImmediatelyAfter(anotherAddFn));
});

test.run();
```

TypeScript declarations are included with the package.

## API

### `snoop(fn)`

Returns a spy object whose `fn` method invokes the supplied function and records
each call.

The wrapper records thrown values in the call's `error` property and returns
`undefined` instead of rethrowing them. This matches the package's existing
behavior.

| Property or method               | Description                                                    |
| -------------------------------- | -------------------------------------------------------------- |
| `fn(...args)`                    | Invokes the function and records its arguments and result.     |
| `testID`                         | Internal numeric identifier used for global call ordering.     |
| `called`                         | Whether the spy has been called at least once.                 |
| `notCalled`                      | Whether the spy has never been called.                         |
| `calledOnce`                     | Whether the spy has been called exactly once.                  |
| `callCount`                      | Number of recorded calls.                                      |
| `calls`                          | All call records in invocation order.                          |
| `firstCall`                      | First call record, or `undefined` before the first call.       |
| `lastCall`                       | Most recent call record, or `undefined` before the first call. |
| `calledBefore(other)`            | Whether this spy was called before the other spy.              |
| `calledAfter(other)`             | Whether this spy was called after the other spy.               |
| `calledImmediatelyBefore(other)` | Whether this spy's latest call immediately preceded the other. |
| `calledImmediatelyAfter(other)`  | Whether this spy's latest call immediately followed the other. |

Each call record contains `arguments`, `result`, and `error`.

## Runtime requirements

- An ESM-compatible runtime or bundler
- No runtime dependencies

## Development

Install dependencies:

```sh
bun install
```

Run the tests:

```sh
bun run test
```

Format the project:

```sh
bun run format
```

## License

[MIT](LICENSE)
