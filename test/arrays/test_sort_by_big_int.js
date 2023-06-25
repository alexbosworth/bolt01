const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');
const {throws} = require('node:assert').strict;

const {sortByBigInt} = require('./../../arrays');

const tests = [
  {
    args: {},
    description: 'An array is required',
    error: 'ExpectedArrayToSortByBigIntAttribute',
  },
  {
    args: {array: []},
    description: 'An attribute to sort by is required',
    error: 'ExpectedAttributeToSortArrayByBigInt',
  },
  {
    args: {array: [{foo: 1}, {foo: 2}, {foo: 3}], attribute: 'foo'},
    description: 'Array is sorted when reversed',
    expected: {sorted: [{foo: 1}, {foo: 2}, {foo: 3}]},
  },
  {
    args: {array: [{foo: 1}, {foo: 3}, {foo: 2}], attribute: 'foo'},
    description: 'Array is sorted when jumbled',
    expected: {sorted: [{foo: 1}, {foo: 2}, {foo: 3}]},
  },
  {
    args: {array: [{foo: 3}, {foo: 3}, {foo: 2}], attribute: 'foo'},
    description: 'Array is sorted when equals exist',
    expected: {sorted: [{foo: 2}, {foo: 3}, {foo: 3}]},
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, (t, end) => {
    if (!!error) {
      throws(() => sortByBigInt(args), new Error(error), 'Got expected error');
    } else {
      const {sorted} = sortByBigInt(args);

      deepStrictEqual(sorted, expected.sorted, 'Array is sorted as expected');
    }

    return end();
  });
});
