const BN = require('bn.js');

const tagAsUint8 = n => new BN(n).toString(16, 2);
const tagAsUint16 = n => `fd${new BN(n).toString(16, 4)}`;
const tagAsUint32 = n => `fe${new BN(n).toString(16, 8)}`;
const tagAsUint64 = n => `ff${new BN(n).toString(16, 16)}`;
const max8BitNumber = BigInt(0xfc);
const max16BitNumber = BigInt(0xffff);
const max32BitNumber = BigInt(0xffffffff);

/** Given a numeric value, encode it as BOLT 01 "BigSize" bytes

  {
    number: <Number String>
  }

  @throws
  <Error>

  @returns
  {
    encoded: <BigSize Encoded Value Hex String>
  }
*/
module.exports = ({number}) => {
  if (!number) {
    throw new Error('ExpectedNumberToEncodeAsBigSize');
  }

  // Return when the number can be represented in a byte as itself
  if (BigInt(number) <= max8BitNumber) {
    return {encoded: tagAsUint8(number)};
  }

  // Return when the number can be represented within a uint16
  if (BigInt(number) <= max16BitNumber) {
    return {encoded: tagAsUint16(number)};
  }

  // Return when the number can be represented within a uint32
  if (BigInt(number) <= max32BitNumber) {
    return {encoded: tagAsUint32(number)};
  }

  return {encoded: tagAsUint64(number)};
};
