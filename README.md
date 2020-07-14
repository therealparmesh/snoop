# snoop 🎵

> Easy breezy test spies fo sheezy.

![Snoop Dogg](./snoop.gif)

[![npm](https://img.shields.io/npm/v/snoop.svg)](https://www.npmjs.com/package/snoop)
[![npm](https://img.shields.io/npm/dt/snoop.svg)](https://www.npmjs.com/package/snoop)

## Install

```sh
npm install --save-dev snoop
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
