const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');
const {throws} = require('node:assert').strict;

const {encodeTlvRecord} = require('./../../');

const tests = [
  {
    args: {type: '1', value: 'test'},
    description: 'A hex value is expected',
    error: 'ExpectedHexEncodedValueToEncodeTlvRecord',
  },
  {
    args: {type: '1', value: '00'},
    description: 'A zero byte value is encoded',
    expected: {encoded: '010100'},
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, (t, end) => {
    if (!!error) {
      throws(() => encodeTlvRecord(args), new Error(error), 'Got error');
    } else {
      deepStrictEqual(encodeTlvRecord(args), expected, 'Got expected result');
    }

    return end();
  });
});
