const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');
const {throws} = require('node:assert').strict;

const {encodeTlvStream} = require('./../../');

const tests = [
  {
    args: {records: []},
    description: 'A zero record stream is encoded',
    expected: {encoded: ''},
  },
  {
    args: {records: undefined},
    description: 'Records are expected',
    error: 'ExpectedArrayOfRecordsToEncodeTlvStream',
  },
  {
    args: {records: [{type: '1', value: '01'}, {type: '1', value: '02'}]},
    description: 'Unique records are expected',
    error: 'ExpectedNoDuplicateTypeRecordsToEncodeInTlvStream',
  },
  {
    args: {
      records: [
        {type: '1', value: '01'},
        {type: '2', value: '0000000000000226'},
      ],
    },
    description: 'A 2 record stream is decoded',
    expected: {encoded: '01010102080000000000000226'},
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, (t, end) => {
    if (!!error) {
      throws(() => encodeTlvStream(args), new Error(error), 'Got error');
    } else {
      deepStrictEqual(encodeTlvStream(args), expected, 'Got expected result');
    }

    return end();
  });
});
