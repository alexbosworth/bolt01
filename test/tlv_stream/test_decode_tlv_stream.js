const {test} = require('@alexbosworth/tap');

const {decodeTlvStream} = require('./../../');

const tests = [
  {
    args: {encoded: '0'},
    description: 'A hex stream is expected',
    error: 'ExpectedHexEncodedTlvStreamToDecode',
  },
  {
    args: {encoded: ''},
    description: 'A zero record stream is decoded',
    expected: {records: []},
  },
  {
    args: {encoded: '01010102080000000000000226'},
    description: 'A 2 record stream is decoded',
    expected: {
      records: [
        {length: 3, type: '1', value: '01'},
        {length: 10, type: '2', value: '0000000000000226'},
      ],
    },
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, ({end, strictSame, throws}) => {
    if (!!error) {
      throws(() => decodeTlvStream(args), new Error(error), 'Got error');
    } else {
      strictSame(decodeTlvStream(args), expected, 'Got expected result');
    }

    return end();
  });
});
