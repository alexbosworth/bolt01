const equalTo = 0;
const greaterThan = 1;
const {isArray} = Array;
const lessThan = -1;

/** Sort array by BigInt castable attribute, lowest to highest

  {
    array: [<Array Element Object>]
    attribute: <BigInt Castable Attribute String>
  }

  @throws
  <Error>

  @returns
  {
    sorted: [<Sorted Element Object>]
  }
*/
module.exports = ({array, attribute}) => {
  if (!isArray(array)) {
    throw new Error('ExpectedArrayToSortByBigIntAttribute');
  }

  if (!attribute) {
    throw new Error('ExpectedAttributeToSortArrayByBigInt');
  }

  const sorted = array.slice().sort((a, b) => {
    const bigA = BigInt(a[attribute]);
    const bigB = BigInt(b[attribute]);

    return bigA > bigB ? greaterThan : (bigB > bigA ? lessThan : equalTo);
  });

  return {sorted};
};
