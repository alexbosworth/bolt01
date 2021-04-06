const {test} = require('tap');

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
  return test(description, ({end, strictSame, throws}) => {
    if (!!error) {
      throws(() => encodeTlvStream(args), new Error(error), 'Got error');
    } else {
      strictSame(encodeTlvStream(args), expected, 'Got expected result');
    }

    return end();
  });
});
