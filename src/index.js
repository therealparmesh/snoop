let testIDCounter = 0;
let callCounter = 0;
const callMap = {};

function snoop(fn, context = null) {
  const testID = testIDCounter++;
  const calls = [];

  return {
    fn() {
      let result;
      const args = Array.from(arguments);
      callMap[testID] = callMap[testID] || [];

      try {
        result = fn.apply(context, args);

        calls.push({
          result,
          arguments: args,
          error: undefined,
        });
      } catch (error) {
        calls.push({
          result,
          arguments: args,
          error,
        });
      } finally {
        callMap[testID].push(callCounter++);

        return result;
      }
    },
    get testID() {
      return testID;
    },
    get called() {
      return calls.length > 0;
    },
    get notCalled() {
      return calls.length === 0;
    },
    get calledOnce() {
      return calls.length === 1;
    },
    get callCount() {
      return calls.length;
    },
    get calls() {
      return calls;
    },
    get firstCall() {
      return calls[0];
    },
    get lastCall() {
      return calls[calls.length - 1];
    },
    calledBefore: function calledBefore(otherSnoopFn) {
      if (this.notCalled) {
        return false;
      }

      if (otherSnoopFn.notCalled) {
        return true;
      }

      return (
        callMap[this.testID][0] <
        callMap[otherSnoopFn.testID][callMap[otherSnoopFn.testID].length - 1]
      );
    },
    calledAfter: function calledAfter(otherSnoopFn) {
      if (this.notCalled || otherSnoopFn.notCalled) {
        return false;
      }

      return (
        callMap[this.testID][callMap[this.testID].length - 1] >
        callMap[otherSnoopFn.testID][0]
      );
    },
    calledImmediatelyBefore: function calledImmediatelyBefore(otherSnoopFn) {
      if (this.notCalled || otherSnoopFn.notCalled) {
        return false;
      }

      return (
        callMap[this.testID][callMap[this.testID].length - 1] ===
        callMap[otherSnoopFn.testID][callMap[otherSnoopFn.testID].length - 1] -
          1
      );
    },
    calledImmediatelyAfter: function calledImmediatelyAfter(otherSnoopFn) {
      if (this.notCalled || otherSnoopFn.notCalled) {
        return false;
      }

      return (
        callMap[this.testID][callMap[this.testID].length - 1] ===
        callMap[otherSnoopFn.testID][callMap[otherSnoopFn.testID].length - 1] +
          1
      );
    },
  };
}

module.exports = {
  snoop,
};
