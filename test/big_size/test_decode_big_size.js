const {test} = require('@alexbosworth/tap');

const {decodeBigSize} = require('./../../');

const tests = [
  {
    args: {},
    description: 'An encoded big size value is required',
    error: 'ExpectedHexEncodedBigSizeValueToDecode',
  },
  {
    args: {encoded: '0001'},
    description: 'Zero value is decoded',
    expected: {decoded: '0', length: 1},
  },
  {
    args: {encoded: 'fc'},
    description: 'A single byte value is decoded',
    expected: {decoded: '252', length: 1},
  },
  {
    args: {encoded: 'fd00fd'},
    description: 'The smallest two byte number is decoded',
    expected: {decoded: '253', length: 3},
  },
  {
    args: {encoded: 'fdffff'},
    description: 'The largest two byte number is decoded',
    expected: {decoded: '65535', length: 3},
  },
  {
    args: {encoded: 'fe00010000'},
    description: 'The smallest four byte number is decoded',
    expected: {decoded: '65536', length: 5},
  },
  {
    args: {encoded: 'feffffffff'},
    description: 'The largest four byte number is decoded',
    expected: {decoded: '4294967295', length: 5},
  },
  {
    args: {encoded: 'ff0000000100000000'},
    description: 'The smallest eight byte number is decoded',
    expected: {decoded: '4294967296', length: 9},
  },
  {
    args: {encoded: 'ffffffffffffffffff'},
    description: 'The largest eight byte number is decoded',
    expected: {decoded: '18446744073709551615', length: 9},
  },
  {
    args: {encoded: 'fd00fc'},
    description: 'Two byte numbers must be efficiently encoded',
    error: 'ExpectedLargerNumberToDecodeUint16BigSize',
  },
  {
    args: {encoded: 'fe0000ffff'},
    description: 'Four byte numbers must be efficiently encoded',
    error: 'ExpectedLargerNumberToDecodeUint32BigSize',
  },
  {
    args: {encoded: 'ff00000000ffffffff'},
    description: 'Eight byte numbers must be efficiently encoded',
    error: 'ExpectedLargerNumberToDecodeUint64BigSize',
  },
  {
    args: {encoded: 'fd00'},
    description: 'Two byte numbers must have enough bytes',
    error: 'ExpectedMoreBytesToDecodeUint16BigSize',
  },
  {
    args: {encoded: 'fd'},
    description: 'Two byte numbers must have bytes',
    error: 'ExpectedMoreBytesToDecodeUint16BigSize',
  },
  {
    args: {encoded: 'feffff'},
    description: 'Four byte numbers must have enough bytes',
    error: 'ExpectedMoreBytesToDecodeUint32BigSize',
  },
  {
    args: {encoded: 'fe'},
    description: 'Four byte numbers must have bytes',
    error: 'ExpectedMoreBytesToDecodeUint32BigSize',
  },
  {
    args: {encoded: 'ffffffffff'},
    description: 'Eight byte numbers must have enough bytes',
    error: 'ExpectedMoreBytesToDecodeUint64BigSize',
  },
  {
    args: {encoded: 'ff'},
    description: 'Eight byte numbers must have bytes',
    error: 'ExpectedMoreBytesToDecodeUint64BigSize',
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, ({end, equal, throws}) => {
    if (!!error) {
      throws(() => decodeBigSize(args), new Error(error), 'Got error');
    } else {
      const value = decodeBigSize(args);

      equal(value.decoded, expected.decoded, 'Got expected result');
      equal(value.length, expected.length, 'Got expected length');
    }

    return end();
  });
});
