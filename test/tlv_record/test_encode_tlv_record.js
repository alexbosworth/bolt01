const {test} = require('@alexbosworth/tap');

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
  return test(description, ({end, strictSame, throws}) => {
    if (!!error) {
      throws(() => encodeTlvRecord(args), new Error(error), 'Got error');
    } else {
      strictSame(encodeTlvRecord(args), expected, 'Got expected result');
    }

    return end();
  });
});
