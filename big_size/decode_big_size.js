const BN = require('bn.js');

const hexAsBuffer = hex => Buffer.from(hex, 'hex');
const isHex = n => !!n && !(n.length % 2) && /^[0-9A-F]*$/i.test(n);
const max8BitNumber = 0xfc;
const max16BitNumber = 0xffff;
const max32BitNumber = 0xffffffff;
const readUint16 = n => new BN(n.slice(1, 3)).toString();
const readUint32 = n => new BN(n.slice(1, 5)).toString();
const readUint64 = n => new BN(n.slice(1, 9)).toString();
const uint8Length = 1;
const uint16 = 0xfd;
const uint16Length = 3;
const uint32 = 0xfe;
const uint32Length = 5;
const uint64Length = 9;

/** Given BOLT 01 "BigSize" bytes, return a corresponding numeric value

  {
    encoded: <BigSize Encoded Value Hex String>
  }

  @throws
  <Error>

  @returns
  {
    decoded: <Decoded Number String>
    length: <Encoding Byte Length Number>
  }
*/
module.exports = ({encoded}) => {
  if (!isHex(encoded)) {
    throw new Error('ExpectedHexEncodedBigSizeValueToDecode');
  }

  const bytes = hexAsBuffer(encoded);

  const [size] = bytes;

  // Exit early when the number is within the 1 byte range
  if (size <= max8BitNumber) {
    return {decoded: size.toString(), length: uint8Length};
  }

  const byteLength = bytes.length;

  switch (size) {
  case uint16:
    // Exit with error when there aren't enough bytes for a uint16
    if (byteLength < uint16Length) {
      throw new Error('ExpectedMoreBytesToDecodeUint16BigSize');
    }

    const uint16Number = readUint16(bytes);

    // Exit with error when this could have been encoded as a single byte
    if (Number(uint16Number) <= max8BitNumber) {
      throw new Error('ExpectedLargerNumberToDecodeUint16BigSize');
    }

    return {decoded: uint16Number, length: uint16Length};

  case uint32:
    // Exit with error when there aren't enough bytes for a uint32
    if (byteLength < uint32Length) {
      throw new Error('ExpectedMoreBytesToDecodeUint32BigSize');
    }

    const uint32Number = readUint32(bytes);

    // Exit with error when this could have been encoded as 2 bytes
    if (Number(uint32Number) <= max16BitNumber) {
      throw new Error('ExpectedLargerNumberToDecodeUint32BigSize');
    }

    return {decoded: uint32Number, length: uint32Length};

  // The only remaining possibility for the size is 0xff indicating uint64
  default:
    // Exit with error when there aren't enough bytes for a uint64
    if (byteLength < uint64Length) {
      throw new Error('ExpectedMoreBytesToDecodeUint64BigSize');
    }

    const uint64Number = readUint64(bytes);

    // Exit with error when this could have been encoded as 4 bytes
    if (BigInt(uint64Number) <= BigInt(max32BitNumber)) {
      throw new Error('ExpectedLargerNumberToDecodeUint64BigSize');
    }

    return {decoded: uint64Number, length: uint64Length};
  }
};
