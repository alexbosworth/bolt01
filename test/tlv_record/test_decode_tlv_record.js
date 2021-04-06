const {test} = require('tap');

const {decodeTlvRecord} = require('./../../');

const tests = [
  {
    args: {encoded: '2101'},
    description: 'Bytes must be available for a record',
    error: 'ExpectedAdditionalValueBytesInTlvRecord',
  },
  {
    args: {encoded: '210000'},
    description: 'A zero value record is decoded',
    expected: {length: 2, type: '33', value: ''},
  },
  {
    args: {encoded: 'fd020100'},
    description: 'A zero value record decoded with a uint16 type',
    expected: {length: 4, type: '513', value: ''},
  },
  {
    args: {encoded: 'fd00fd00'},
    description: 'A zero value record decoded with a low uint16 type',
    expected: {length: 4, type: '253', value: ''},
  },
  {
    args: {encoded: 'fd00ff00'},
    description: 'A zero value record decoded with a regular uint16 type',
    expected: {length: 4, type: '255', value: ''},
  },
  {
    args: {encoded: 'fe0200000100'},
    description: 'A zero value record decoded with a uint32 type',
    expected: {length: 6, type: '33554433', value: ''},
  },
  {
    args: {encoded: 'ff020000000000000100'},
    description: 'A zero value record decoded with a uint64 type',
    expected: {length: 10, type: '144115188075855873', value: ''},
  },
  {
    args: {encoded: '0101010101'},
    description: 'A one byte record decoded',
    expected: {length: 3, type: '1', value: '01'},
  },
  {
    args: {encoded: '01020100'},
    description: 'A two byte record decoded',
    expected: {length: 4, type: '1', value: '0100'},
  },
  {
    args: {encoded: '210001020100', offset: 2},
    description: 'A two byte record decoded',
    expected: {length: 4, type: '1', value: '0100'},
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, ({end, strictSame, throws}) => {
    if (!!error) {
      throws(() => decodeTlvRecord(args), new Error(error), 'Got error');
    } else {
      strictSame(decodeTlvRecord(args), expected, 'Got expected result');
    }

    return end();
  });
});
